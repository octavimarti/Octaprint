#!/usr/bin/env python3
"""Static SEO checks for octaprint.cat. Python standard library only."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse, unquote
import json
import sys
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
HOST = "octaprint.cat"
NS = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9",
      "x": "http://www.w3.org/1999/xhtml"}

class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = ""
        self.in_title = False
        self.meta = {}
        self.links = []
        self.images = []
        self.jsonld = []
        self.in_jsonld = False
        self.json_buffer = ""

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "title":
            self.in_title = True
        elif tag == "meta" and a.get("name") == "description":
            self.meta["description"] = a.get("content", "")
        elif tag == "link":
            self.links.append(a)
        elif tag == "img":
            self.images.append(a)
        elif tag == "script" and a.get("type") == "application/ld+json":
            self.in_jsonld = True
            self.json_buffer = ""

    def handle_data(self, data):
        if self.in_title:
            self.title += data
        if self.in_jsonld:
            self.json_buffer += data

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
        elif tag == "script" and self.in_jsonld:
            self.jsonld.append(self.json_buffer)
            self.in_jsonld = False

def local_path(url):
    parsed = urlparse(url)
    if parsed.scheme != "https" or parsed.hostname not in {HOST, "www." + HOST}:
        return None
    relative = unquote(parsed.path).lstrip("/")
    return ROOT / relative / "index.html" if not relative or relative.endswith("/") else ROOT / relative

def main():
    errors, warnings = [], []
    sitemap = ROOT / "sitemap.xml"
    try:
        tree = ET.parse(sitemap)
    except (OSError, ET.ParseError) as exc:
        print("ERROR sitemap.xml:", exc)
        return 1
    urls = [e.text.strip() for e in tree.findall(".//s:url/s:loc", NS) if e.text]
    if len(urls) != len(set(urls)):
        errors.append("Duplicate sitemap URLs")
    for url in urls:
        path = local_path(url)
        if path is None:
            errors.append("External or non-HTTPS sitemap URL: " + url)
            continue
        if not path.is_file():
            errors.append("Missing sitemap target: " + url)
            continue
        if path.suffix != ".html":
            continue
        page = Page()
        try:
            page.feed(path.read_text(encoding="utf-8"))
        except (OSError, UnicodeError) as exc:
            errors.append(f"{path}: {exc}")
            continue
        rel = path.relative_to(ROOT)
        if not page.title.strip():
            errors.append(f"{rel}: missing title")
        if not page.meta.get("description", "").strip():
            errors.append(f"{rel}: missing meta description")
        canonicals = [x.get("href") for x in page.links if x.get("rel") == "canonical"]
        if canonicals != [url]:
            errors.append(f"{rel}: canonical {canonicals!r} does not match {url}")
        for link in page.links:
            if link.get("rel") == "alternate" and link.get("hreflang"):
                target = local_path(link.get("href", ""))
                if target is None or not target.is_file():
                    errors.append(f"{rel}: broken hreflang {link.get('href')}")
        for block in page.jsonld:
            try:
                json.loads(block)
            except json.JSONDecodeError as exc:
                errors.append(f"{rel}: invalid JSON-LD: {exc}")
        missing_alt = sum("alt" not in img for img in page.images)
        if missing_alt:
            warnings.append(f"{rel}: {missing_alt} images without alt attribute")
    print(f"Checked {len(urls)} sitemap URLs")
    for issue in errors:
        print("ERROR:", issue)
    for issue in warnings:
        print("WARNING:", issue)
    print(f"Result: {len(errors)} errors, {len(warnings)} warnings")
    return 1 if errors else 0

if __name__ == "__main__":
    sys.exit(main())

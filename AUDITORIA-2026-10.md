# Auditoria web octaprint.cat — 13/10/2026

## Canvis aplicats en aquesta versió
- **Legal (LSSI art. 10 / RGPD / cookies):** noves pàgines `/legal/`, `/es/legal/`, `/en/legal/` (avís legal, privacitat, cookies); identificació de la societat i enllaços legals al peu; informació bàsica RGPD i casella de consentiment obligatòria al formulari.
- **Zero cookies de tercers:** tipografies allotjades al propi web (adeu Google Fonts); vídeos amb `youtube-nocookie.com`. Sense analítica → no cal bàner de cookies.
- **Seguretat:** Content-Security-Policy (meta), Referrer-Policy, tot el JavaScript a `/assets/js/main.js` (cap gestor `onclick` inline), `noopener noreferrer`, `/.well-known/security.txt`, `.nojekyll`.
- **Formulari:** ja no mostra "enviat" si FormSubmit falla; missatge d'error i enllaç a WhatsApp en lloc d'obrir finestres automàticament.
- **SEO:** canonical i `og:url` correctes per idioma, `og:image` pròpia, `legalName` + `taxID` al JSON-LD, sitemap actualitzat amb pàgines legals, pàgina 404, favicon.
- **Eliminat:** bloc de text ocult "AI-readable" (text amagat = risc de penalització de Google) i 270 atributs d'idioma obsolets (-26 % de pes HTML).
- **Accessibilitat i rendiment:** FAQ i menú usables amb teclat, cursor personalitzat només amb ratolí, respecta "reduir moviment", loader més curt, enllaç "saltar al formulari", banderes d'idioma com a enllaços reals, imatges WebP (logo wallPen 131 KB → 10 KB).

## Promeses comercials corregides (criteri prudent) — v2
- **Garantia:** 5 anys per escrit (alineada amb la garantia de 60 mesos del fabricant). Eliminat "5+ anys", "mai s'engroga" i "durada mínima".
- **Desplaçament:** gratuït fins a 30 km de Barcelona (abans 100 km), d'acord amb la tarifa del pla de negoci.
- **Temps d'execució:** eliminat "el mateix dia", "un matí", "1-4 hores", "2-3 m²/h", "5 min de muntatge" i "zero tancament". Ara: ~1 m²/hora, muntatge ~1 hora, 20 m² ≈ 2–3 jornades, treball per zones o fora d'horari.
- **Assegurança RC:** frase eliminada fins que hi hagi pòlissa signada.
- **Disseny:** adaptació de l'arxiu sense cost; disseny nou des de zero, pressupostat a part.
- **wallPen:** "distribuïdors exclusius / Ibèria / Portugal" substituït per "Partner oficial wallPen". Portugal fora de l'àrea de servei. Eliminat "45+ països" i "aprovades per entorns mèdics" (no verificats). Vídeos i referències identificats com a material de wallPen GmbH.
- **Comparativa amb vinil:** refeta amb arguments verificables (juntes, adhesiu, superfícies rugoses, garantia, obra prèvia); eliminats preus i "~150 DPI".
- **Errors de traducció corregits:** a /es/ i /en/ el títol principal (H1), les 9 respostes de la FAQ, la taula comparativa i el menú mòbil estaven en català o amb etiquetes HTML visibles.

## Pendent (decisió de l'Octavi)
1. Dades registrals: afegir tom i foli a les pàgines legals quan tinguis la nota d'inscripció del Registre Mercantil (les còpies de l'escriptura del 31/07 són anteriors a la inscripció i no els inclouen).
2. Assegurança RC: quan estigui contractada, es pot tornar a esmentar a la FAQ.
3. Contracte de distribució wallPen: quan estigui signat, revisar si es vol tornar a dir "distribuïdor oficial" i el territori.
4. FormSubmit: revisar-ne les condicions/ubicació o passar a un proveïdor UE; activar captcha si arriba spam.
5. Imatges i vídeo carregats des de wallpen.com: demanar autorització per escrit i allotjar-los al repositori.
6. GitHub → Settings → Pages: marcar **Enforce HTTPS**.
7. Si s'activa Google Analytics 4: cal bàner de consentiment (CMP) i Consent Mode v2 **abans** de publicar-lo.

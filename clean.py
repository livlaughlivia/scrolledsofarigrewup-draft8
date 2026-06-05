import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Kommentar + Floater-Div entfernen
html = re.sub(
    r'[ \t]*<!-- Floater \d[^\n]*-->\n[ \t]*<div class="floater[123] floater"[^>]*>\n[ \t]*<img[^>]*>\n[ \t]*</div>\n(\n)?',
    '',
    html
)

# Floater-Divs ohne Kommentar entfernen (Restfälle)
html = re.sub(
    r'[ \t]*<div class="floater[123] floater"[^>]*>\n[ \t]*<img[^>]*>\n[ \t]*</div>\n(\n)?',
    '',
    html
)

remaining = len(re.findall(r'class="floater[123] floater"', html))
print(f'Verbleibende Floater-Divs: {remaining}')

with open('index_clean.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Gespeichert als index_clean.html')
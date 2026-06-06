#!/usr/bin/env python3
import http.server
import socketserver
import os

PORT = 8001

class CacheControlHTTPHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Cache-Control für statische Assets
        if self.path.endswith(('.js', '.css', '.webp', '.woff2', '.svg')):
            if self.path.startswith('/img/') or self.path.startswith('/ABCArizona'):
                # Long-term caching für Images und Fonts
                self.send_header('Cache-Control', 'public, max-age=31536000, immutable')
            else:
                # Shorter cache für JS/CSS (falls aktualisiert)
                self.send_header('Cache-Control', 'public, max-age=3600, must-revalidate')
        else:
            # HTML: kurzes Caching mit must-revalidate
            self.send_header('Cache-Control', 'public, max-age=60, must-revalidate')
        
        super().end_headers()

if __name__ == '__main__':
    handler = CacheControlHTTPHandler
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        print(f"Serving HTTP on port {PORT} with Cache-Control headers...")
        print(f"Navigate to http://localhost:{PORT}")
        httpd.serve_forever()

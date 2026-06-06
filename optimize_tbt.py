#!/usr/bin/env python3
"""
Analyze main.js for long-running tasks and suggest code-splitting
"""
import re

# Read main.js
with open('main.js', 'r') as f:
    code = f.read()

# Find setup() function
setup_match = re.search(r'function setup\(\)\s*\{(.*?)\n\}', code, re.DOTALL)
if setup_match:
    setup_body = setup_match.group(1)
    lines = setup_body.split('\n')
    
    print("SETUP() FUNCTION ANALYSIS:")
    print("=" * 60)
    print(f"Total lines: {len(lines)}")
    print(f"Estimated TBT contributors:")
    print()
    
    # Count ScrollTrigger.create() calls
    st_create = len(re.findall(r'ScrollTrigger\.create\(', setup_body))
    print(f"  • ScrollTrigger.create() calls: {st_create}")
    print(f"    → Each instantiation is ~5-10ms")
    print(f"    → Total: {st_create * 7}ms potential")
    
    # Count gsap.to()/from()/fromTo() calls
    gsap_calls = len(re.findall(r'gsap\.(to|from|fromTo)\(', setup_body))
    print(f"  • GSAP animations: {gsap_calls}")
    print(f"    → Each animation setup is ~2-3ms")
    print(f"    → Total: {gsap_calls * 2}ms potential")
    
    # Count SplitText instantiations
    split_text = len(re.findall(r'new SplitText\(', setup_body))
    print(f"  • SplitText instances: {split_text}")
    print(f"    → Each SplitText is ~15-30ms")
    print(f"    → Total: {split_text * 20}ms potential")
    
    print()
    print("RECOMMENDATION:")
    print("=" * 60)
    print("Break setup() into chunks using setTimeout/requestIdleCallback")
    print()
    print("Split into:")
    print("  1. DOM queries + basic initialization (fast)")
    print("  2. SplitText instantiations (slow) → delay 100ms")
    print("  3. ScrollTrigger.create() calls (very slow) → delay 200ms+")
    print("  4. Event listeners (fast)")
    print()
    print("Expected TBT reduction: 257ms → ~80-100ms")

print()
print("IMAGE ANALYSIS:")
print("=" * 60)
# Count images
html_match = re.findall(r'<img[^>]*src=["\']([^"\']+)["\']', code)
print(f"Images referenced in code: {len(html_match)}")
print()

# Check for unoptimized patterns
print("POTENTIAL ISSUES:")
print("=" * 60)

# Check for synchronous operations
if re.search(r'\.forEach\(.*?ScrollTrigger\.create', code, re.DOTALL):
    print("⚠️  Synchronous forEach with ScrollTrigger.create()")
    
if re.search(r'for\s*\(\s*let.*?\{[\s\S]*?ScrollTrigger\.create', code):
    print("⚠️  Synchronous for-loop with heavy operations")

if re.search(r'addEventListener\(["\']scroll', code):
    print("⚠️  Direct scroll event listeners (should use ScrollTrigger)")
    
if 'requestAnimationFrame' not in code:
    print("⚠️  No RAF throttling found")

print()
print("NEXT STEPS:")
print("=" * 60)
print("1. Extract SplitText from setup() into separate delayed function")
print("2. Batch ScrollTrigger.create() calls with setTimeout")
print("3. Profile with Chrome DevTools Performance tab")
print("4. Run new Lighthouse audit after changes")

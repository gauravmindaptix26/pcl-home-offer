#!/usr/bin/env python3
"""Restructure blog post HTML to add proper section wrappers."""

import re

# Read the file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace "What Are Companies" section
content = re.sub(
    r'(\s+)<h2>What Are Companies That Buy Houses in Memphis\?</h2>\n(\s+)<p>Companies that buy houses in Memphis are real estate investors or home-buying businesses that purchase properties directly from homeowners often for cash\. Unlike traditional buyers, they:</p>\n(\s+)<ul>\n(\s+)<li>Skip bank financing</li>\n(\s+)<li>Don\'t require repairs or renovations</li>\n(\s+)<li>Close deals quickly \(sometimes in days\)</li>\n(\s+)</ul>\n(\s+)<p>This makes them ideal for sellers who need speed, convenience, and certainty\.</p>',
    r'\1<!-- What Are Companies Section -->\n\1<section class="blog-section">\n\1  <h2>What Are Companies That Buy Houses in Memphis?</h2>\n\1  <p>Companies that buy houses in Memphis are real estate investors or home-buying businesses that purchase properties directly from homeowners often for cash. Unlike traditional buyers, they:</p>\n\1  <ul>\n\1    <li>Skip bank financing</li>\n\1    <li>Don\'t require repairs or renovations</li>\n\1    <li>Close deals quickly (sometimes in days)</li>\n\1  </ul>\n\1  <p>This makes them ideal for sellers who need speed, convenience, and certainty.</p>\n\1</section>',
    content,
    flags=re.MULTILINE | re.DOTALL
)

# Replace "Why Choose" with benefits grid
content = re.sub(
    r'(\s+)<h2>Why Choose Cash Home Buyers in Memphis\?</h2>\n(\s+)<p>Here\'s why many homeowners prefer working with trusted companies that buy houses in Memphis for cash:</p>\n\n(\s+)<h3>Fast Closings</h3>\n(\s+)<p>Most deals close within <strong>7–14 days</strong>, compared to <strong>30–60 days</strong> with traditional sales\.</p>\n\n(\s+)<h3>Sell As-Is</h3>\n(\s+)<p>No need to spend money fixing your home\. Local companies that buy houses in Memphis without repairs will purchase properties in any condition\.</p>\n\n(\s+)<h3>No Hidden Fees</h3>\n(\s+)<p>You typically avoid agent commissions, closing costs, and marketing expenses\.</p>\n\n(\s+)<h3>Less Stress</h3>\n(\s+)<p>No showings, open houses, or waiting for buyer approvals\.</p>',
    r'\1<!-- Why Choose Section -->\n\1<section class="blog-section">\n\1  <h2>Why Choose Cash Home Buyers in Memphis?</h2>\n\1  <p>Here\'s why many homeowners prefer working with trusted companies that buy houses in Memphis for cash:</p>\n\n\1  <div class="blog-benefits">\n\1    <div class="blog-benefit">\n\1      <h3>Fast Closings</h3>\n\1      <p>Most deals close within <strong>7–14 days</strong>, compared to <strong>30–60 days</strong> with traditional sales.</p>\n\1    </div>\n\n\1    <div class="blog-benefit">\n\1      <h3>Sell As-Is</h3>\n\1      <p>No need to spend money fixing your home. Local companies that buy houses in Memphis without repairs will purchase properties in any condition.</p>\n\1    </div>\n\n\1    <div class="blog-benefit">\n\1      <h3>No Hidden Fees</h3>\n\1      <p>You typically avoid agent commissions, closing costs, and marketing expenses.</p>\n\1    </div>\n\n\1    <div class="blog-benefit">\n\1      <h3>Less Stress</h3>\n\1      <p>No showings, open houses, or waiting for buyer approvals.</p>\n\1    </div>\n\1  </div>\n\1</section>',
    content,
    flags=re.MULTILINE | re.DOTALL
)

# Write back
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("HTML restructuring complete!")

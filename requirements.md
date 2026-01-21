# Sentiment IQ – Requirements

---

## Product Overview

**Sentiment IQ** is a Chrome extension that helps online shoppers evaluate the *true* quality of a product by analyzing authentic discussions from various public platforms and forums. Instead of relying solely on brand-controlled or incentivized reviews, Sentiment IQ exposes hidden complaints, recurring issues, and real-world usage feedback through a clear **B.S. Meter score**.

The product acts as a trust layer on top of existing e-commerce platforms (Amazon, Shopify stores, Daraz, Alibaba, etc.) without modifying the shopping experience.

---

## What It Does

* Detects products users are viewing on supported e-commerce websites
* Collects real, unfiltered discussions about those products from public platforms
* Uses AI to analyze sentiment, emotional intensity, and recurring issues
* Generates a **Real Sentiment Score (B.S. Meter)** from 0–100
* Summarizes honest pros, cons, and warning signals directly inside the browser

---

## How It Works

1. User installs the Sentiment IQ Chrome extension
2. User opens a product page on a supported e-commerce site
3. Extension extracts product metadata (name, brand, category, identifiers)
4. Extension sends a request to the backend with product metadata
5. Backend:

   * Checks cache for existing sentiment data
   * If not found, fetches public discussions via Firecrawl (forums, social platforms, etc.)
   * Runs AI-based sentiment analysis
   * Computes the B.S. Meter score
   * Stores results in cache
6. Backend returns sentiment data to the extension
7. Extension displays score, summary, and warnings in a non-intrusive UI

---

## Features List

### Core Features (MVP)

* Automatic product detection on e-commerce pages
* Real Sentiment (B.S. Meter) score from 0–100
* Color-coded trust indicator (Green / Yellow / Red)
* Summary of top complaints and positive mentions
* Works without user login (free tier)

### Pro Features (Post-MVP)

* Unlimited daily sentiment lookups
* Detailed sentiment breakdown by category (quality, support, durability, etc.)
* Product-to-product sentiment comparison
* Historical sentiment trend tracking

---

## Analysis Flow

### Sentiment Analysis Pipeline

1. Input: Product metadata (name, brand, category)
2. Query generation:

   * Product name + issue keywords
   * Brand + product + "problem", "review", "issue"
3. Data collection:

   * Fetch discussions using Firecrawl (crawling forums, social platforms, and other public sources)
4. AI processing:

   * Classify sentiment (positive / negative / neutral)
   * Detect emotional intensity
   * Identify recurring complaint themes
5. Scoring:

   * Weight negative vs positive mentions
   * Penalize repeated issues
   * Compare external sentiment with store rating
6. Output:

   * B.S. Meter score
   * Textual summary
   * Risk indicators

---

## Auth Flow

### Free Tier (Default)

* No user authentication required
* Extension generates an anonymous device identifier
* Daily lookup limit enforced via backend using anonymous ID

### Pro Tier (Authenticated)

1. User clicks "Upgrade to Pro" inside extension or dashboard
2. User is redirected to a secure web page
3. User signs up or logs in (email + password or OAuth)
4. Backend associates subscription with user account
5. Extension stores a secure access token
6. Token is used to authenticate API requests and unlock Pro features

---

## Plan Upgrade Flow

1. User reaches free daily lookup limit
2. Extension displays upgrade prompt explaining Pro benefits
3. User clicks "Upgrade"
4. User is redirected to pricing / checkout page
5. User completes subscription payment
6. Backend:

   * Activates Pro plan
   * Updates user entitlement
7. Extension detects Pro status on next API request
8. Pro features are unlocked instantly

---

## Notes & Constraints

* No personal browsing data is stored
* All sentiment data is sourced from public platforms only
* Product sentiment is cached to minimize API usage and cost
* Architecture must support adjusting Firecrawl crawl rules/targets for new data sources

---

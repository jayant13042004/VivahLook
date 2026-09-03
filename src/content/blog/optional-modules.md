---
title: Optional modules without the bloat
description: Turn blog, analytics, email, and admin on or off from one config file.
date: 2026-09-03
published: true
---

Phase 5 modules are **optional**. Flip flags in `src/config/modules.ts` so a marketing site does not ship an admin console you do not need.

Analytics and email still no-op until you add provider keys. That keeps local demos quiet and production opt-in.

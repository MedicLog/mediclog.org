# Device-Framed Screenshots

Professional device mockups with realistic iPhone and Apple Watch frames.

## Files

- `iphone-light-framed.png` - iPhone 17 Pro mockup with light mode screenshot
- `iphone-dark-framed.png` - iPhone 17 Pro mockup with dark mode screenshot
- `watch-framed.png` - Apple Watch mockup with timer display

## Generation

These frames are generated using `/Users/joel/git/Agents/MedicLog-T95/create_device_mockups.py`.

To regenerate after updating source screenshots:

```bash
cd /Users/joel/git/Agents/MedicLog-T95
python3 create_device_mockups.py
```

## Device Features

**iPhone mockups include:**
- Midnight (space black) bezel
- Dynamic Island cutout
- Rounded corners matching iPhone 17 Pro
- Realistic drop shadow
- Subtle metallic shine

**Apple Watch mockups include:**
- Space Black case
- Digital Crown (right side, upper)
- Side button (right side, below crown)
- Rounded square shape (28% corner radius)
- Realistic drop shadow

## Source Screenshots

Raw screenshots (without frames) are in `/screenshots/`:
- `01-active-call-light.png` - iPhone light mode
- `01-active-call-dark.png` - iPhone dark mode
- `watch-timers.png` - Apple Watch (PLACEHOLDER - update after B101/B114 verification)

## Usage

Currently used on:
- `index.html` - Hero section (3 device mockups)

CSS frames (`.device-frame-iphone` and `.device-frame-watch`) are still used on:
- `docs.html` - Feature documentation
- Other pages throughout the site

## Future Updates

**After B101/B114 hardware verification:**
1. Take new Watch screenshot showing improved timer display (12pt font, proper positioning)
2. Replace `screenshots/watch-timers.png`
3. Regenerate `watch-framed.png` using the script
4. Commit updated mockup

The device frame generation is automated, so updating the source screenshot and re-running the script will produce a consistent framed version.

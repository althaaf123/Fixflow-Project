# FixFlow — Design to Code

FixFlow is an on-demand home-services marketplace that helps homeowners discover repair services, find verified professionals, book a service, and track the service journey.

This project was created by converting the selected FixFlow Figma design into a responsive front-end using HTML, CSS, and Vanilla JavaScript.

---

## Design-to-Code Process

### 1. Studied the Figma Design

I first reviewed the selected FixFlow Figma design and studied:

- Page structure
- Section spacing
- Grid layouts
- Typography
- Colours
- Card designs
- Corner radii
- Buttons
- Interactive elements
- Desktop, Tablet, and Mobile layouts

---

### 2. Divided the Design into 15 Sections

I broke the complete Figma page into 15 sections and followed the same order throughout the implementation:

1. Hero
2. Services
3. Simple Process
4. Smart Assistant
5. Smart Match
6. Trusted Professionals
7. Professional Detail
8. Book Your Service
9. Booking Confirmed
10. Live Tracking
11. Why Choose FixFlow
12. Loved By Thousands
13. Support
14. Ready to Get It Fixed
15. Footer

---

### 3. Created the HTML Structure

I created the main page structure in `index.html` using semantic HTML sections.

Each major section was given a meaningful ID so that the sections could be connected through smooth scrolling and interactions.

The main section structure includes:

- `hero`
- `services`
- `process`
- `assistant`
- `match`
- `professionals`
- `detail`
- `booking`
- `confirmed`
- `tracking`
- `why`
- `testimonials`
- `support`
- `cta`
- `footer`

---

### 4. Created the CSS Styling

I created `style.css` to reproduce the visual styling of the FixFlow Figma design.

The CSS implementation includes:

- CSS Grid
- Flexbox
- CSS Custom Properties
- Media Queries
- Transitions
- Responsive layouts
- Card styling
- Button styling
- Typography
- Section spacing
- Responsive alignment

The main colours used in the design are:

- Navy — `#061C3A`
- Blue — `#2F6B93`
- Orange — `#FFA51F`
- Ink — `#0E1B2B`
- Green — `#2ABE78`

---

### 5. Recreated the Figma Layout

I converted the main visual layouts from Figma into HTML and CSS.

The implemented sections include:

- Hero
- Services
- Simple Process
- Smart Assistant
- Smart Match
- Trusted Professionals
- Professional Detail
- Book Your Service
- Booking Confirmed
- Live Tracking
- Why Choose FixFlow
- Loved By Thousands
- Support
- Ready to Get It Fixed
- Footer

I also recreated the organic hero ring shape and matched the visual structure of the original design.

---

### 6. Added JavaScript Interactions

I used Vanilla JavaScript in `script.js` to make the website interactive.

The implemented interactions include:

- Service card selection
- Smooth scrolling
- Smart Assistant interactions
- Issue chip selection
- Issue photo upload preview
- Input validation
- Professional search
- Rating sorting
- Professional profile switching
- Booking summary updates
- Booking confirmation
- Booking ID generation
- Live tracking animation
- CTA interactions
- Confirmation alerts

---

### 7. Created Reusable Components

I created reusable UI patterns instead of duplicating the same HTML repeatedly.

The reusable components include:

- Service Card
- Step Card
- Issue Chip
- Photo Upload Preview
- Professional Card
- Detail Card
- Booking Summary Card
- Confirmation Card
- Tracking Marker

These reusable patterns helped keep the implementation consistent throughout the page.

---

### 8. Added Service Selection

The Services section allows users to select a service card.

When a service is selected:

- The selected state is displayed
- The selected service is used for the next part of the flow
- The user can continue toward the Smart Assistant and booking process

---

### 9. Added Smart Assistant Interaction

The Smart Assistant allows users to describe the problem they are facing.

I implemented:

- Issue chips
- Preset issue text
- Problem description input
- Image upload
- Live image preview
- Input validation

The validation prevents the user from continuing when the problem description is empty and displays an inline message instead of interrupting the user with a pop-up.

---

### 10. Added Professional Search and Filtering

The Trusted Professionals section includes dynamic search functionality.

When the user enters a professional's name in the search field, the professional cards are filtered in real time.

I also added rating-based sorting so that professionals can be reordered according to their ratings.

---

### 11. Added Dynamic Professional Details

The Professional Detail section uses a shared data object.

When a professional is selected, the following information is updated dynamically:

- Name
- Rating
- Experience
- Jobs Completed
- Response Time
- Base Price
- Professional Image

This avoids duplicating the same HTML structure for every professional.

---

### 12. Added Dynamic Booking Summary

The Book Your Service section contains the booking form.

The booking summary updates whenever the user changes the relevant form values, including:

- Service
- Date
- Time
- Price

This keeps the booking information synchronized with the user's current selections.

---

### 13. Added Booking Confirmation

After the booking is confirmed, the Booking Confirmed section displays the completed booking state.

A random Booking ID is generated using JavaScript and displayed as part of the confirmation.

---

### 14. Created Live Tracking

I implemented the Live Tracking section using SVG path geometry.

The tracking marker moves along the actual curved SVG route instead of moving in a simple straight line.

The implementation uses the SVG methods `getTotalLength()` and `getPointAtLength()`.

A CSS transition is also used to create a smooth movement effect between tracking points.

---

### 15. Made the Website Responsive

I created responsive layouts for:

- Desktop
- Tablet
- Mobile

The responsive breakpoints are:

- Desktop — Above 1024px
- Tablet — 641px to 1024px
- Mobile — Below 640px

Different sections use different column rules depending on the available screen width.

For example:

- Services: 4 → 2 → 1
- Simple Process: 5 → 3 → 1
- Footer: 4 → 2 → 1

This keeps the cards and content readable across different screen sizes.

---

### 16. Tested the Responsive Layout

I tested the website across:

- Desktop
- Tablet
- Mobile

Chrome DevTools Device Toolbar was used to verify the layouts at different viewport sizes.

I checked:

- Section layouts
- Cards
- Buttons
- Forms
- Spacing
- Typography
- Responsive columns
- Interactive behaviour

---

### 17. Compared the Code with the Figma Design

After completing the implementation, I compared each coded section with the original Figma design.

I reviewed:

- Spacing
- Colours
- Typography
- Grid structure
- Card dimensions
- Corner radii
- Interactive states
- Responsive behaviour

This final comparison helped maintain consistency between the coded website and the original Figma design.

---

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- Figma
- Chrome DevTools
- VS Code

---

## Project Structure

```text
FixFlow/
│
├── index.html
├── style.css
├── script.js
├── README.md
│
└── assets/
    ├── images/
    │   ├── hero-technician.jpg
    │   ├── rajesh-kumar.jpg
    │   ├── amit-singh.jpg
    │   ├── suresh-menon.jpg
    │   ├── david-wilson.jpg
    │   ├── recent-work-1.jpg
    │   ├── recent-work-2.jpg
    │   ├── fixflow-map.jpg
    │   ├── review-priya.jpg
    │   ├── review-arun.jpg
    │   └── review-sarah.jpg
    │
    └── icons/
        ├── help-center.png
        ├── chat-support.png
        ├── email-us.png
        └── emergency-help.png

---

## Main User Flow

**Home Problem**

↓

**Service Selection**

↓

**Smart Assistant**

↓

**Smart Match**

↓

**Professional Selection**

↓

**Professional Details**

↓

**Book Your Service**

↓

**Booking Confirmation**

↓

**Live Tracking**

↓

**Get It Fixed**

---

## Challenges Faced

During the implementation, the main challenges included:

- Recreating the organic hero ring shape
- Maintaining consistency across 15 sections
- Managing different grid layouts for Desktop, Tablet, and Mobile
- Animating the tracking marker along a curved SVG path
- Keeping the booking information synchronized without using a framework
- Creating Smart Assistant validation without disrupting the user experience
- Avoiding duplicated markup for professional cards
- Maintaining the correct visual rhythm across the complete long-form page

---

## Solutions Implemented

To solve these challenges, I:

- Recreated the mixed border-radius values for the hero shape
- Used shared CSS variables for the main colours
- Created reusable card patterns
- Used section-specific responsive grid rules
- Used SVG path geometry for the tracking animation
- Used direct DOM updates for booking information
- Used inline validation messages instead of disruptive pop-ups
- Used one shared professional data object for multiple professional cards
- Tested each section against the original Figma design

---

## Final Result

The final result is a responsive FixFlow website that reproduces the selected Figma design using HTML, CSS, and Vanilla JavaScript.

The complete implementation contains 15 connected sections and supports Desktop, Tablet, and Mobile layouts.

---

## What I Learned

Through this project, I worked on:

- Figma-to-code conversion
- Semantic HTML structure
- CSS Grid and Flexbox
- Responsive web design
- Reusable UI components
- Vanilla JavaScript DOM manipulation
- Interactive UI states
- Form handling
- Dynamic content updates
- SVG path-based animation
- Responsive testing
- Design-to-code workflow

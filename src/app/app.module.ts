// This file is no longer used as we are using standalone component bootstrapping in main.ts
// All bootstrapping and module registration has been moved to main.ts
// This file is kept for reference only and can be safely removed

/*
The application now uses standalone components with the following imports:
- BrowserModule
- AppRoutingModule
- AgGridModule
- SlickCarouselModule
- MatButtonModule
- MatIconModule
- NgImageSliderModule
- MatExpansionModule
- BrowserAnimationsModule
- FontAwesomeModule (for icons)

AG Grid modules are registered in main.ts using:
ModuleRegistry.registerModules([AllCommunityModule]);

FontAwesome 0.14.0 is used for compatibility with Angular 19.

See main.ts for the complete bootstrap configuration.
*/

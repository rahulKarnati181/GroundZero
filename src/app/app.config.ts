import { ApplicationConfig } from '@angular/core';
import { provideRouter,withInMemoryScrolling } from '@angular/router';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled', // scroll to top on new routes
        anchorScrolling: 'enabled'           // support #fragment scrolling, optional
        // scrollOffset: [0, 0]              // keep default offset
      })
    )
  ]
};

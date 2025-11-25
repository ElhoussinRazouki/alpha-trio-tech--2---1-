declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA_TRACKING_ID = 'G-R37FB4HJ8Y';

/**
 * Track a custom event in Google Analytics
 */
export const trackEvent = (
  eventName: string,
  parameters: Record<string, any> = {}
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...parameters,
      custom_parameter_1: 'alphatrio_tech',
    });
  } else {
    console.log('GA Event:', eventName, parameters);
  }
};

/**
 * Track page views (handled automatically by GA, but can be used for SPA navigation)
 */
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
};

/**
 * Track user interactions
 */
export const trackInteraction = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  trackEvent('user_interaction', {
    event_category: category,
    event_action: action,
    event_label: label,
    value: value,
  });
};

/**
 * Track button clicks
 */
export const trackButtonClick = (
  buttonName: string,
  buttonLocation: string,
  additionalData?: Record<string, any>
) => {
  trackEvent('button_click', {
    button_name: buttonName,
    button_location: buttonLocation,
    ...additionalData,
  });
};

/**
 * Track link clicks
 */
export const trackLinkClick = (
  linkText: string,
  linkUrl: string,
  linkType: 'internal' | 'external' | 'social' = 'internal'
) => {
  trackEvent('link_click', {
    link_text: linkText,
    link_url: linkUrl,
    link_type: linkType,
  });
};

/**
 * Track form interactions
 */
export const trackFormInteraction = (
  formName: string,
  action: 'start' | 'submit' | 'error' | 'abandon',
  step?: string
) => {
  trackEvent('form_interaction', {
    form_name: formName,
    form_action: action,
    form_step: step,
  });
};

/**
 * Track scroll depth
 */
export const trackScrollDepth = (depth: number) => {
  trackEvent('scroll_depth', {
    scroll_depth: depth,
    scroll_percentage: Math.round(depth),
  });
};

/**
 * Track theme changes
 */
export const trackThemeChange = (theme: string) => {
  trackEvent('theme_change', {
    theme_selected: theme,
  });
};

/**
 * Track language changes
 */
export const trackLanguageChange = (language: string) => {
  trackEvent('language_change', {
    language_selected: language,
  });
};

/**
 * Track social media interactions
 */
export const trackSocialInteraction = (
  platform: string,
  action: 'click' | 'share' | 'follow',
  target?: string
) => {
  trackEvent('social_interaction', {
    social_platform: platform,
    social_action: action,
    social_target: target,
  });
};

/**
 * Track booking funnel events (complements existing dataLayer pushes)
 */
export const trackBookingFunnel = (
  step: string,
  action: string,
  data?: Record<string, any>
) => {
  trackEvent('booking_funnel', {
    funnel_step: step,
    funnel_action: action,
    ...data,
  });
};

/**
 * Track engagement metrics
 */
export const trackEngagement = (
  type: 'time_on_page' | 'video_play' | 'content_view',
  duration?: number,
  contentId?: string
) => {
  trackEvent('engagement', {
    engagement_type: type,
    duration: duration,
    content_id: contentId,
  });
};

/**
 * Initialize scroll depth tracking
 */
export const initScrollDepthTracking = () => {
  if (typeof window === 'undefined') return;

  const scrollDepths = [25, 50, 75, 90, 100];
  const trackedDepths = new Set<number>();

  const checkScrollDepth = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    scrollDepths.forEach(depth => {
      if (scrollPercent >= depth && !trackedDepths.has(depth)) {
        trackedDepths.add(depth);
        trackScrollDepth(depth);
      }
    });
  };

  // Throttle scroll events
  let ticking = false;
  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        checkScrollDepth();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Cleanup function
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

/**
 * Initialize outbound link tracking
 */
export const initOutboundLinkTracking = () => {
  if (typeof window === 'undefined') return;

  const handleLinkClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a') as HTMLAnchorElement;

    if (link && link.href) {
      const url = new URL(link.href, window.location.origin);

      // Check if it's an external link
      if (url.origin !== window.location.origin) {
        trackLinkClick(
          link.textContent?.trim() || link.getAttribute('aria-label') || 'Unknown',
          link.href,
          'external'
        );
      }
    }
  };

  document.addEventListener('click', handleLinkClick);

  // Cleanup function
  return () => {
    document.removeEventListener('click', handleLinkClick);
  };
};
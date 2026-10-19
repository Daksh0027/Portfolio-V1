import 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          url?: string;
          'mouse-controls'?: string;
        },
        HTMLElement
      >;
    }
  }
}

export {};

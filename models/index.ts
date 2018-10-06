export interface PhantomGlobalOptions {
  /* number of allocated phantomjs processes */
  numberOfWorkers?: number;
  /* timeout in ms for html conversion, when the timeout is reached, the phantom process is recycled */
  timeout?: number;
  /* directory where are stored temporary html and pdf files, use something like npm package reaper to clean this up */
  tmpDir?: string;
  /* optional port range where to start phantomjs server */
  portLeftBoundary?: number;
  portRightBoundary?: number;
  /* optional hostname where to start phantomjs server */
  host?: string;
  /* use rather dedicated process for every phantom printing
      dedicated-process strategy is quite slower but can solve some bugs
      with corporate proxy */
  strategy: string;
  /* optional path to the phantomjs binary
       NOTE: When using phantomjs 2.0, be aware of https://github.com/ariya/phantomjs/issues/12685 */
  phantomPath?: string;
  /* see phantomjs arguments for proxy setting details */
  proxy?: any; // proxy-type,proxy-auth,
  /* the collected console.log messages are trimmed by default */
  maxLogEntrySize?: number;
}

export interface PhantomLocalOptions {
  html?: string;
  header?: string;
  footer?: string;
  url?: string;
  printDelay?: number; // time in ms to wait before printing into pdf
  /**
   * set to true to enable programmatically specify (via Javascript of the page)
   * when the pdf printing starts (see Programmatic pdf printing section for an example)
   */
  waitForJS?: boolean;
  /**
   * name of the variable that will be used as a printing trigger,
   * defaults to "PHANTOM_HTML_TO_PDF_READY" (see Programmatic pdf printing section for an example)
   */
  waitForJSVarName?: string;
  /**
   * set to true to allow request starting with file:///
   */
  allowLocalFilesAccess?: false;
  /**
   * see PhantomJS options for paperSize - http://phantomjs.org/api/webpage/property/paper-size.html
   */
  paperSize?: PhantomPaperSize;
  /**
   * whether to set zoom if contents don't fit on the page
   */
  fitToPage?: boolean;
  customHeaders?: any;
  /**
   * injects javascript files in the page
   */
  injectJs?: Array<string>;
  /**
   * { javascriptEnabled : true, resourceTimeout: 1000 },
   */
  settings?: any;
  /**
   * see phantomjs docs - http://phantomjs.org/api/webpage/property/viewport-size.html
   */
  viewportSize?: PhantomViewPort;
  format?: {
    quality: number;
  };
}

export interface PhantomPaperSize {
  format: string;
  orientation: string;
  margin: PhantomPaperMargin;
  headerHeight: string;
  footerHeight: string;
}

export interface PhantomPaperMargin {
  top: string;
  right: string;
  bottom: string;
  left: string;
}

export interface PhantomViewPort {
  width: number;
  height: number;
}

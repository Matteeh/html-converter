
export interface PdfConversion {
    input: {
        html?: {
            body?: string;
            header?: string;
            footer?: string;
        } | undefined;
        url?: string | undefined;
    }
    output?: {
        pdf?: PdfOptions;
    }
}

export interface PdfOptions {
    displayHeaderFooter?: boolean;
    landscape?: boolean;
    pageRanges?: string;
    format?: string;
    width?: string;
    height?: string;
    margin?: {
        top?: string;
        right?: string;
        bottom?: string;
        left?: string;
    }
    preferCSSPageSize?: boolean;
}

export interface ScreenshotConversion {
    input: {
        html?: {
            body?: string;
        } | undefined;
        url?: string | undefined;
    }
    output?: {
        screenshot?: ScreenshotOptions;
    }
}

export interface ScreenshotOptions {
    type?: 'png' | 'jpeg';
    quality?: number;
    fullPage?: boolean;
    clip?: {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
    }
    omitBackground?: boolean;
    encoding?: 'base64' | 'binary';
}
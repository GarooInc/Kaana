"use client";
import React, { useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Pages = React.forwardRef((props, ref) => (
    <div className="demoPage w-full h-full" ref={ref} style={{ height: '100%', width: '100%' }}>
        {props.children}
    </div>
));

Pages.displayName = 'Pages';

const Flipbook = ({ pdf }) => {
    const [numPages, setNumPages] = useState(null);
    const [dimensions, setDimensions] = useState({ width: 400, height: 580 });
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 640);

    useEffect(() => {
        const updateSize = () => {
            const width = Math.min(window.innerWidth * 0.80, 400);
            const height = width * 1.5;
            setDimensions({ width, height });
            setIsSmallScreen(window.innerWidth < 640);
        };

        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    return (
        <div className="flex flex-col gap-5 justify-center items-center overflow-hidden w-full h-full">
            <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
                {numPages && (
                    <HTMLFlipBook
                        style={
                            isSmallScreen
                                ? {
                                      width: `${dimensions.width}px`,
                                      height: `${dimensions.height}px`,
                                  }
                                : {}
                        }
                        width={dimensions.width}
                        height={dimensions.height}
                        className="max-w-full max-h-full"
                        showCover={true}
                    >
                        {[...Array(numPages).keys()].map((pNum) => (
                            <Pages key={pNum} number={pNum + 1}>
                                <Page
                                    pageNumber={pNum + 1}
                                    width={dimensions.width}
                                    renderAnnotationLayer={false}
                                    renderTextLayer={false}
                                />
                            </Pages>
                        ))}
                    </HTMLFlipBook>
                )}
            </Document>
        </div>
    );
};

export default Flipbook;
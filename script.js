// ==UserScript==
// @name         Habblet Removedor de Anúncios
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Bloqueador de anúncios para o Habblet
// @author       Drath
// @match        https://www.habblet.city/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=habblet.city
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function removerElementosAnuncio() {
             const adsById = ["ad1", "ad2", "aswift_2"];
        adsById.forEach(id => {
            const element = document.getElementById(id);
            if (element) element.remove();
        });

        
        const iframesAnuncio = document.querySelectorAll('iframe[src*="googlesyndication.com"]');
        iframesAnuncio.forEach(iframe => iframe.remove());

        const adsenseElements = document.querySelectorAll(".adsbygoogle, .adsbygoogle-noablate");
        adsenseElements.forEach(elem => elem.remove());

       
        const dialogElements = [
            '.fc-ab-dialog',
            '.fc-ab-root',
            '.fc-dialog-container',
            '.player'
        ];

        dialogElements.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(elem => elem.remove());
        });

        
        const adDivs = document.querySelectorAll('div[bis_precise_ad="1"]');
        adDivs.forEach(div => div.remove());

       
        const googleContainerElements = document.querySelectorAll('[data-google-container-id]');
        googleContainerElements.forEach(elem => elem.remove());
    }

    
    function adicionarEstilosAntiAnuncio() {
        const estiloCSS = `
            iframe[src*="googlesyndication.com"],
            iframe[src*="pagead2.googlesyndication.com"],
            .adsbygoogle,
            .adsbygoogle-noablate,
            div[bis_precise_ad="1"],
            div[data-google-container-id],
            #ad1, #ad2, #aswift_2,
            .fc-ab-dialog, .fc-ab-root, .fc-dialog-container, .player {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                width: 0 !important;
                height: 0 !important;
                position: absolute !important;
                pointer-events: none !important;
                z-index: -9999 !important;
            }
        `;

        const styleElement = document.createElement('style');
        styleElement.textContent = estiloCSS;
        document.head.appendChild(styleElement);
    }

  
    function bloquearScriptsAnuncio() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                    for (let i = 0; i < mutation.addedNodes.length; i++) {
                        const node = mutation.addedNodes[i];
                        if (node.tagName === 'SCRIPT') {
                            if (node.src && (
                                node.src.includes('googlesyndication.com') ||
                                node.src.includes('pagead2.googleadservices.com') ||
                                node.src.includes('adsbygoogle') ||
                                node.src.includes('ads')
                            )) {
                                node.remove();
                            }
                        }
                    }
                }
            });
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }

  
    adicionarEstilosAntiAnuncio();
    bloquearScriptsAnuncio();

   
    removerElementosAnuncio();

    //intervalo para  remoção de anúncios
    setInterval(removerElementosAnuncio, 500);

    
    document.addEventListener('DOMContentLoaded', function() {
        removerElementosAnuncio();
    });


    window.addEventListener('load', function() {
        removerElementosAnuncio();
    });
})();
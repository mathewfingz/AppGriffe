"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cssVariables = exports.novaWorks = exports.novaHaven = exports.curryLanding = exports.pixelVerse = void 0;
// Export presets
var pixel_verse_js_1 = require("./presets/pixel-verse.js");
Object.defineProperty(exports, "pixelVerse", { enumerable: true, get: function () { return __importDefault(pixel_verse_js_1).default; } });
var curry_landing_js_1 = require("./presets/curry-landing.js");
Object.defineProperty(exports, "curryLanding", { enumerable: true, get: function () { return __importDefault(curry_landing_js_1).default; } });
var nova_haven_js_1 = require("./presets/nova-haven.js");
Object.defineProperty(exports, "novaHaven", { enumerable: true, get: function () { return __importDefault(nova_haven_js_1).default; } });
var nova_works_js_1 = require("./presets/nova-works.js");
Object.defineProperty(exports, "novaWorks", { enumerable: true, get: function () { return __importDefault(nova_works_js_1).default; } });
// CSS Variables for theming
exports.cssVariables = {
    'pixel-verse': {
        '--background': '0 0% 100%',
        '--foreground': '222.2 84% 4.9%',
        '--card': '0 0% 100%',
        '--card-foreground': '222.2 84% 4.9%',
        '--popover': '0 0% 100%',
        '--popover-foreground': '222.2 84% 4.9%',
        '--primary': '221.2 83.2% 53.3%',
        '--primary-foreground': '210 40% 98%',
        '--secondary': '210 40% 96%',
        '--secondary-foreground': '222.2 84% 4.9%',
        '--muted': '210 40% 96%',
        '--muted-foreground': '215.4 16.3% 46.9%',
        '--accent': '210 40% 96%',
        '--accent-foreground': '222.2 84% 4.9%',
        '--destructive': '0 84.2% 60.2%',
        '--destructive-foreground': '210 40% 98%',
        '--border': '214.3 31.8% 91.4%',
        '--input': '214.3 31.8% 91.4%',
        '--ring': '221.2 83.2% 53.3%',
        '--radius': '0.5rem',
    },
    'nova-works': {
        '--background': '0 0% 100%',
        '--foreground': '222.2 84% 4.9%',
        '--card': '0 0% 100%',
        '--card-foreground': '222.2 84% 4.9%',
        '--popover': '0 0% 100%',
        '--popover-foreground': '222.2 84% 4.9%',
        '--primary': '142.1 76.2% 36.3%',
        '--primary-foreground': '355.7 100% 97.3%',
        '--secondary': '210 40% 96%',
        '--secondary-foreground': '222.2 84% 4.9%',
        '--muted': '210 40% 96%',
        '--muted-foreground': '215.4 16.3% 46.9%',
        '--accent': '210 40% 96%',
        '--accent-foreground': '222.2 84% 4.9%',
        '--destructive': '0 84.2% 60.2%',
        '--destructive-foreground': '210 40% 98%',
        '--border': '214.3 31.8% 91.4%',
        '--input': '214.3 31.8% 91.4%',
        '--ring': '142.1 76.2% 36.3%',
        '--radius': '0.5rem',
    }
};

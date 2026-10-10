import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

window.HTMLElement.prototype.scrollIntoView = () => {}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

if (!document.fonts) {
  Object.defineProperty(document, 'fonts', {
    writable: true,
    value: {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    },
  })
}

class ResizeObserverMock implements ResizeObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}

window.ResizeObserver = ResizeObserverMock

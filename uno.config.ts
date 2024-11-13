import { defineConfig, presetUno, presetIcons, presetWebFonts } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetWebFonts({
      fonts: {
        sans: 'IBM Plex Sans Thai',
        handwriting: 'Caveat'
      }
    })
  ],
  theme: {
    colors: {
      primary: {
        base: '#4F46E5',
        light: '#818CF8'
      },
      secondary: {
        base: '#64748B',
        light: '#94A3B8'
      },
      neutral: {
        base: '#6B7280',
        light: '#D1D5DB'
      },
      success: {
        base: '#10B981',
        light: '#34D399'
      },
      warning: {
        base: '#F59E0B',
        light: '#FBBF24'
      },
      error: {
        base: '#EF4444',
        light: '#F87171'
      },
      info: {
        base: '#3B82F6',
        light: '#60A5FA'
      },
      background: '#F9FAFB',
      surface: '#FFFFFF',
      border: '#E5E7EB'
    },
    shortcuts: {
      // Layout
      'layout-container': 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
      
      // Buttons
      'btn': 'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
      'btn-primary': 'btn bg-primary-base text-white hover:bg-primary-light focus:ring-primary-base',
      'btn-secondary': 'btn bg-secondary-light text-secondary-base hover:bg-secondary-base hover:text-white focus:ring-secondary-base',
      'btn-outline': 'btn border-2 border-primary-base text-primary-base hover:bg-primary-light hover:text-white focus:ring-primary-base',
      'btn-ghost': 'btn text-neutral-base hover:bg-neutral-light focus:ring-neutral-base',
      'btn-danger': 'btn bg-error-base text-white hover:bg-error-light focus:ring-error-base',
      
      // Cards
      'card': 'bg-surface rounded-xl shadow-md overflow-hidden',
      'card-hover': 'card hover:shadow-lg transition-shadow duration-200',
      
      // Forms
      'input': 'w-full rounded-lg border border-neutral-light px-4 py-2 text-sm focus:border-primary-base focus:ring-2 focus:ring-primary-base focus:ring-offset-2',
      'input-error': 'input border-error-base focus:border-error-base focus:ring-error-base',
      'label': 'block text-sm font-medium text-neutral-base mb-1',
      'select': 'input appearance-none bg-no-repeat bg-right pr-10',
      'checkbox': 'rounded border-neutral-light text-primary-base focus:ring-primary-base',
      'radio': 'border-neutral-light text-primary-base focus:ring-primary-base',
      
      // Status
      'badge': 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
      'badge-success': 'badge bg-success-light text-success-base',
      'badge-error': 'badge bg-error-light text-error-base',
      'badge-warning': 'badge bg-warning-light text-warning-base',
      'badge-info': 'badge bg-info-light text-info-base'
    }
  }
})
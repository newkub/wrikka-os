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
        50: '#EEF2FF',
        100: '#E0E7FF',
        200: '#C7D2FE',
        300: '#A5B4FC',
        400: '#818CF8',
        500: '#4F46E5',
        600: '#4338CA',
        700: '#3730A3',
        800: '#312E81',
        900: '#1E1B4B'
      },
      secondary: {
        50: '#F8FAFC',
        100: '#F1F5F9',
        200: '#E2E8F0',
        300: '#CBD5E1',
        400: '#94A3B8',
        500: '#64748B',
        600: '#475569',
        700: '#334155',
        800: '#1E293B',
        900: '#0F172A'
      },
      neutral: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827'
      },
      success: {
        50: '#ECFDF5',
        100: '#D1FAE5',
        200: '#A7F3D0',
        300: '#6EE7B7',
        400: '#34D399',
        500: '#10B981',
        600: '#059669',
        700: '#047857',
        800: '#065F46',
        900: '#064E3B'
      },
      warning: {
        50: '#FFFBEB',
        100: '#FEF3C7',
        200: '#FDE68A',
        300: '#FCD34D',
        400: '#FBBF24',
        500: '#F59E0B',
        600: '#D97706',
        700: '#B45309',
        800: '#92400E',
        900: '#78350F'
      },
      error: {
        50: '#FEF2F2',
        100: '#FEE2E2',
        200: '#FECACA',
        300: '#FCA5A5',
        400: '#F87171',
        500: '#EF4444',
        600: '#DC2626',
        700: '#B91C1C',
        800: '#991B1B',
        900: '#7F1D1D'
      },
      info: {
        50: '#EFF6FF',
        100: '#DBEAFE',
        200: '#BFDBFE',
        300: '#93C5FD',
        400: '#60A5FA',
        500: '#3B82F6',
        600: '#2563EB',
        700: '#1D4ED8',
        800: '#1E40AF',
        900: '#1E3A8A'
      },
      coral: {
        500: '#FF7F50'
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
      'btn-primary': 'btn bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500',
      'btn-secondary': 'btn bg-secondary-200 text-secondary-700 hover:bg-secondary-300 focus:ring-secondary-500',
      'btn-outline': 'btn border-2 border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-primary-500',
      'btn-ghost': 'btn text-neutral-600 hover:bg-neutral-100 focus:ring-neutral-500',
      'btn-danger': 'btn bg-error-500 text-white hover:bg-error-600 focus:ring-error-500',
      
      // Cards
      'card': 'bg-surface rounded-xl shadow-md overflow-hidden',
      'card-hover': 'card hover:shadow-lg transition-shadow duration-200',
      
      // Forms
      'input': 'w-full rounded-lg border border-neutral-300 px-4 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
      'input-error': 'input border-error-500 focus:border-error-500 focus:ring-error-500',
      'label': 'block text-sm font-medium text-neutral-700 mb-1',
      'select': 'input appearance-none bg-no-repeat bg-right pr-10',
      'checkbox': 'rounded border-neutral-300 text-primary-500 focus:ring-primary-500',
      'radio': 'border-neutral-300 text-primary-500 focus:ring-primary-500',
      
      // Status
      'badge': 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
      'badge-success': 'badge bg-success-100 text-success-800',
      'badge-error': 'badge bg-error-100 text-error-800',
      'badge-warning': 'badge bg-warning-100 text-warning-800',
      'badge-info': 'badge bg-info-100 text-info-800'
    }
  }
})
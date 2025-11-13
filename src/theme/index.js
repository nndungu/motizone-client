export const theme = {
    colors: {
        primary: '#2563eb',      // Vibrant blue
        primaryDark: '#1d4ed8',
        secondary: '#64748b',    // Cool gray
        accent: '#f59e0b',       // Amber for highlights
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        background: '#f8fafc',
        surface: '#ffffff',
        text: {
            primary: '#1e293b',
            secondary: '#64748b',
            light: '#94a3b8',
        },
        border: '#e2e8f0',
    },
    typography: {
        h1: { fontSize: 32, fontWeight: 'bold', lineHeight: 40 },
        h2: { fontSize: 24, fontWeight: 'bold', lineHeight: 32 },
        h3: { fontSize: 20, fontWeight: '600', lineHeight: 28 },
        body: { fontSize: 16, lineHeight: 24 },
        caption: { fontSize: 14, lineHeight: 20 },
        small: { fontSize: 12, lineHeight: 16 },
    },
    spacing: {
        xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48
    },
    borderRadius: {
        sm: 8, md: 12, lg: 16, xl: 24
    },
    shadows: {
        sm: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
        },
        md: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 4,
        },
    }
};
/**
 * Fecha relativa en el idioma del visitante: "hace 3 días", "3 days ago",
 * "vor 3 Tagen", "il y a 3 jours". Devuelve '' si la fecha no es válida.
 */
export function formatRelativeDate(dateString, locale) {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return '';

    const diffDays = Math.round((date - new Date()) / (1000 * 60 * 60 * 24));
    const absDays = Math.abs(diffDays);
    const rtf = new Intl.RelativeTimeFormat(locale, {
        numeric: 'auto',
        style: 'short',
    });

    if (absDays < 7) return rtf.format(diffDays, 'day');
    if (absDays < 30) return rtf.format(Math.round(diffDays / 7), 'week');
    if (absDays < 365) return rtf.format(Math.round(diffDays / 30), 'month');
    return rtf.format(Math.round(diffDays / 365), 'year');
}

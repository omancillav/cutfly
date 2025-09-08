import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (isoOrSqlDate: string) => {
    const normalized = isoOrSqlDate.includes(" ") && !isoOrSqlDate.includes("T")
      ? isoOrSqlDate.replace(" ", "T")
      : isoOrSqlDate;

    const d = new Date(normalized);
    if (Number.isNaN(d.getTime())) return isoOrSqlDate;

    const parts = new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).formatToParts(d);

    const day = parts.find(p => p.type === 'day')?.value ?? '';
    let month = parts.find(p => p.type === 'month')?.value ?? '';
    month = month.replace('.', '').slice(0, 3).toLowerCase();
    const year = parts.find(p => p.type === 'year')?.value ?? '';

    return `${day} ${month}, ${year}`;
  };

'use client'
import { useSearchParams } from 'next/navigation'

/**
 * Renders an org-specific GitHub link when ?org= query param is present.
 * Used on the Lifecycle support page to provide direct links after disconnect.
 *
 * Usage in MDX:
 *   <OrgLink path="settings/installations" label="GitHub App installations page" />
 *   <OrgLink path="Hello-Lifecycle/settings" label="repository settings" />
 */
export default function OrgLink({ path, label }) {
    const searchParams = useSearchParams()
    const org = searchParams.get('org')

    if (!org) return null

    const href = path.includes('<ORG>')
        ? `https://github.com/${path.replace('<ORG>', org)}`
        : `https://github.com/organizations/${org}/${path}`

    return (
        <p className="mt-2">
            Organization detected:{' '}
            <a href={href} target="_blank" className="underline hover:opacity-80">
                Click here to open for <strong>{org}</strong> ↗
            </a>
        </p>
    )
}

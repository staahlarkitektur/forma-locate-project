import type { ProjectData } from '../lib/formaApi'

interface Props {
  project: ProjectData
}

export function ProjectMetadata({ project }: Props) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm font-semibold text-weave-text truncate">{project.name}</span>
      <span className="text-xs font-medium uppercase tracking-wide px-2 py-0.5 rounded-full bg-weave-twilight-surface text-weave-twilight flex-shrink-0">
        {project.region === 'eu' ? 'EU' : 'US'}
      </span>
      {project.timezone && (
        <span className="text-xs text-weave-text-secondary">{project.timezone}</span>
      )}
    </div>
  )
}

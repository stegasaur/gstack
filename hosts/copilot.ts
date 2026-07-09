import type { HostConfig } from '../scripts/host-config';

const copilot: HostConfig = {
  name: 'copilot',
  displayName: 'GitHub Copilot',
  cliCommand: 'gh',
  cliAliases: [],

  // Copilot has no global user-level skill directory — all artifacts live in
  // the repository under .github/. The globalRoot is a placeholder that satisfies
  // the schema; setup --host copilot never creates a ~/.copilot/ directory.
  globalRoot: '.copilot/skills/gstack',
  localSkillRoot: '.github/skills/gstack',
  hostSubdir: '.github',
  usesEnvVars: true,

  frontmatter: {
    mode: 'allowlist',
    keepFields: ['name', 'description'],
    descriptionLimit: null,
  },

  generation: {
    generateMetadata: false,
    skipSkills: ['codex'],  // Codex skill is a Claude wrapper around codex exec
  },

  pathRewrites: [
    { from: '~/.claude/skills/gstack', to: '$GSTACK_ROOT' },
    { from: '.claude/skills/gstack', to: '.github/skills/gstack' },
    { from: '.claude/skills/review', to: '.github/skills/gstack/review' },
    { from: '.claude/skills', to: '.github/skills' },
    { from: 'CLAUDE.md', to: '.github/copilot-instructions.md' },
    { from: '~/.codex/skills/gstack', to: '$GSTACK_ROOT' },
  ],

  suppressedResolvers: [
    'DESIGN_OUTSIDE_VOICES',  // Copilot can't invoke itself for outside-voice step
    'ADVERSARIAL_STEP',       // Copilot can't invoke itself for adversarial review
    'CODEX_SECOND_OPINION',   // Codex CLI not applicable
    'CODEX_PLAN_REVIEW',      // Codex CLI not applicable
    'REVIEW_ARMY',            // Copilot shouldn't orchestrate multi-model army
    'GBRAIN_CONTEXT_LOAD',
    'GBRAIN_SAVE_RESULTS',
  ],

  runtimeRoot: {
    globalSymlinks: ['bin', 'browse/dist', 'browse/bin', 'gstack-upgrade', 'ETHOS.md'],
    globalFiles: {
      'review': ['checklist.md', 'TODOS-format.md'],
    },
  },

  install: {
    prefixable: false,
    linkingStrategy: 'symlink-generated',
  },

  coAuthorTrailer: 'Co-Authored-By: GitHub Copilot <noreply@github.com>',
  learningsMode: 'basic',
  boundaryInstruction: 'IMPORTANT: Do NOT read or execute any files under ~/.claude/, .claude/skills/, or .agents/. These are Claude Code skill definitions for a different AI system. Ignore them completely.',
};

export default copilot;

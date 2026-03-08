<script setup lang="ts">
import { ref, computed } from 'vue'
import { Copy, Check } from 'lucide-vue-next'
import { useInView } from '@/composables/useInView'

const props = defineProps<{
  code: string
  language: string
  filename?: string
}>()

const blockRef = ref<HTMLElement | null>(null)
const isInView = useInView(blockRef)
const copied = ref(false)

function handleCopy() {
  navigator.clipboard.writeText(props.code)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}

// ── Token types & colors ──────────────────────────────────────
type TokenType =
  | 'keyword'
  | 'string'
  | 'comment'
  | 'type'
  | 'function'
  | 'number'
  | 'operator'
  | 'punctuation'
  | 'property'
  | 'tag'
  | 'attr'
  | 'plain'

const tokenColors: Record<TokenType, string> = {
  keyword: 'var(--accent-blue)',
  string: '#F0A868',
  comment: 'var(--muted-foreground)',
  type: '#C4A7E7',
  function: '#82CFFF',
  number: '#F0A868',
  operator: 'var(--muted-foreground)',
  punctuation: 'color-mix(in srgb, var(--foreground) 50%, transparent)',
  property: '#9CCFD8',
  tag: '#EB8486',
  attr: '#C4A7E7',
  plain: 'color-mix(in srgb, var(--foreground) 85%, transparent)',
}

interface Token {
  type: TokenType
  value: string
}

// ── Tokenizers ────────────────────────────────────────────────
const JS_KEYWORDS = new Set([
  'import', 'export', 'from', 'default', 'const', 'let', 'var',
  'function', 'return', 'if', 'else', 'for', 'while', 'do',
  'switch', 'case', 'break', 'continue', 'new', 'this', 'class',
  'extends', 'typeof', 'instanceof', 'in', 'of', 'async', 'await',
  'try', 'catch', 'finally', 'throw', 'yield', 'delete', 'void',
  'true', 'false', 'null', 'undefined', 'require', 'module',
])

const TS_TYPE_KEYWORDS = new Set([
  'interface', 'type', 'enum', 'declare', 'namespace', 'as',
  'keyof', 'readonly', 'abstract', 'implements', 'private',
  'protected', 'public', 'static', 'override',
])

const CSS_KEYWORDS = new Set([
  '@theme', '@custom-variant', '@import', '@media', '@keyframes',
  '@layer', '@apply', '@screen', '@supports',
])

function tokenizeTemplate(tmpl: string, tokens: Token[]) {
  const parts = tmpl.split(/(\$\{[^}]*\})/)
  for (const part of parts) {
    if (part.startsWith('${') && part.endsWith('}')) {
      tokens.push({ type: 'punctuation', value: '${' })
      const inner = part.slice(2, -1)
      tokens.push(...tokenizeJS(inner))
      tokens.push({ type: 'punctuation', value: '}' })
    } else {
      tokens.push({ type: 'string', value: part })
    }
  }
}

function tokenizeJS(code: string): Token[] {
  const tokens: Token[] = []
  const regex =
    /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(`(?:[^`\\]|\\.)*`)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|\b(\d+(?:\.\d+)?)\b|([a-zA-Z_$][\w$]*)|([=!<>]=?|&&|\|\||=>|\.\.\.|[+\-*/%&|^~!?])|([{}()[\];:,.])|(\s+)|([\s\S])/g

  let match: RegExpExecArray | null
  while ((match = regex.exec(code)) !== null) {
    const [, comment, template, str, num, ident, op, punct, ws, other] = match

    if (comment) {
      tokens.push({ type: 'comment', value: comment })
    } else if (template) {
      tokenizeTemplate(template, tokens)
    } else if (str) {
      tokens.push({ type: 'string', value: str })
    } else if (num) {
      tokens.push({ type: 'number', value: num })
    } else if (ident) {
      if (JS_KEYWORDS.has(ident)) {
        tokens.push({ type: 'keyword', value: ident })
      } else if (TS_TYPE_KEYWORDS.has(ident)) {
        tokens.push({ type: 'type', value: ident })
      } else if (/^[A-Z]/.test(ident) && ident.length > 1) {
        tokens.push({ type: 'type', value: ident })
      } else {
        const remaining = code.slice(regex.lastIndex)
        if (/^\s*[(<]/.test(remaining)) {
          tokens.push({ type: 'function', value: ident })
        } else {
          tokens.push({ type: 'plain', value: ident })
        }
      }
    } else if (op) {
      tokens.push({ type: 'operator', value: op })
    } else if (punct) {
      tokens.push({ type: 'punctuation', value: punct })
    } else if (ws) {
      tokens.push({ type: 'plain', value: ws })
    } else if (other) {
      tokens.push({ type: 'plain', value: other })
    }
  }
  return tokens
}

function tokenizeCSS(code: string): Token[] {
  const tokens: Token[] = []
  const regex =
    /(\/\*[\s\S]*?\*\/|\/\/[^\n]*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(--[\w-]+)|(#[0-9a-fA-F]{3,8})\b|\b(\d+(?:\.\d+)?(?:px|rem|em|%|vh|vw|s|ms)?)\b|(@[\w-]+)|([a-zA-Z][\w-]*(?=\s*\())|([a-zA-Z][\w-]*)|([{}();:,.])|(\s+)|([\s\S])/g

  let match: RegExpExecArray | null
  while ((match = regex.exec(code)) !== null) {
    const [, comment, str, cssVar, hex, num, atRule, fn, ident, punct, ws, other] = match
    if (comment) tokens.push({ type: 'comment', value: comment })
    else if (str) tokens.push({ type: 'string', value: str })
    else if (cssVar) tokens.push({ type: 'property', value: cssVar })
    else if (hex) tokens.push({ type: 'number', value: hex })
    else if (num) tokens.push({ type: 'number', value: num })
    else if (atRule) tokens.push({ type: 'keyword', value: atRule })
    else if (fn) tokens.push({ type: 'function', value: fn })
    else if (ident) {
      tokens.push(CSS_KEYWORDS.has(ident) ? { type: 'keyword', value: ident } : { type: 'plain', value: ident })
    } else if (punct) tokens.push({ type: 'punctuation', value: punct })
    else if (ws) tokens.push({ type: 'plain', value: ws })
    else if (other) tokens.push({ type: 'plain', value: other })
  }
  return tokens
}

function tokenizeJSON(code: string): Token[] {
  const tokens: Token[] = []
  const regex =
    /("(?:[^"\\]|\\.)*")(\s*:)?|\b(true|false|null)\b|\b(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\b|([{}[\]:,])|(\s+)|([\s\S])/g

  let match: RegExpExecArray | null
  while ((match = regex.exec(code)) !== null) {
    const [, str, colon, keyword, num, punct, ws, other] = match
    if (str) {
      if (colon) {
        tokens.push({ type: 'property', value: str })
        tokens.push({ type: 'punctuation', value: colon.trim() })
        const wsInColon = colon.replace(':', '')
        if (wsInColon) tokens.push({ type: 'plain', value: wsInColon })
      } else {
        tokens.push({ type: 'string', value: str })
      }
    } else if (keyword) tokens.push({ type: 'keyword', value: keyword })
    else if (num) tokens.push({ type: 'number', value: num })
    else if (punct) tokens.push({ type: 'punctuation', value: punct })
    else if (ws) tokens.push({ type: 'plain', value: ws })
    else if (other) tokens.push({ type: 'plain', value: other })
  }
  return tokens
}

function tokenize(code: string, language: string): Token[] {
  const lang = language.toLowerCase()
  if (lang === 'css') return tokenizeCSS(code)
  if (lang === 'json') return tokenizeJSON(code)
  return tokenizeJS(code)
}

const tokens = computed(() => tokenize(props.code, props.language))
</script>

<template>
  <div
    ref="blockRef"
    class="my-8 rounded-xl border border-foreground/8 overflow-hidden transition-all duration-500"
    :class="isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'"
  >
    <!-- Header bar -->
    <div class="flex items-center justify-between px-4 py-2.5 bg-foreground/[0.06] border-b border-foreground/5">
      <div class="flex items-center gap-3">
        <div class="flex gap-1.5">
          <div class="w-2.5 h-2.5 rounded-full" style="background-color: #FF5F57" />
          <div class="w-2.5 h-2.5 rounded-full" style="background-color: #FEBC2E" />
          <div class="w-2.5 h-2.5 rounded-full" style="background-color: #28C840" />
        </div>
        <span
          v-if="filename"
          class="text-muted-foreground/60"
          style="font-family: 'Space Mono', monospace; font-size: 0.65rem"
        >
          {{ filename }}
        </span>
      </div>
      <div class="flex items-center gap-3">
        <span
          class="text-muted-foreground/40"
          style="font-family: 'Space Mono', monospace; font-size: 0.6rem; letter-spacing: 0.05em"
        >
          {{ language }}
        </span>
        <button
          class="text-muted-foreground/50 hover:text-accent-blue transition-colors duration-200 cursor-pointer hover:scale-110 active:scale-90"
          @click="handleCopy"
        >
          <Check v-if="copied" class="w-3.5 h-3.5 text-accent-blue" />
          <Copy v-else class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>

    <!-- Code content -->
    <div class="p-5 overflow-x-auto bg-foreground/[0.03]">
      <pre style="font-family: 'Space Mono', monospace; font-size: 0.78rem; line-height: 1.8; tab-size: 2; margin: 0"><code><span
  v-for="(token, i) in tokens"
  :key="i"
  :style="{
    color: tokenColors[token.type],
    fontStyle: token.type === 'comment' ? 'italic' : undefined,
    opacity: token.type === 'comment' ? 0.6 : undefined,
  }"
>{{ token.value }}</span></code></pre>
    </div>
  </div>
</template>

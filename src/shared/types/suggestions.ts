type SuggestionType = 'company' | 'user'

export interface Suggestion {
  name: string | null;
  type: SuggestionType;
  alias: string;
  avatar: string | null;
}

export type Suggestions = Array<Suggestion>

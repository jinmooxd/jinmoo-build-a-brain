export type StimulusCategory = 'word' | 'image' | 'shape'

export type Stimulus = {
  id: string
  label: string
  category: StimulusCategory
  emoji?: string
}

export const streamStimuli: string[] = [
  'car horn',
  'blue sign',
  'cold air',
  'coffee smell',
  'someone laughing',
  'phone buzz',
  'squeaky shoes',
  'bus brakes',
  'green jacket',
  'rain on glass',
]

export const spotlightStimuli: Stimulus[] = [
  { id: 's-1', label: 'coffee cup', category: 'image', emoji: '☕' },
  { id: 's-2', label: 'violin note', category: 'word' },
  { id: 's-3', label: 'red umbrella', category: 'image', emoji: '☂️' },
  { id: 's-4', label: 'neon sign', category: 'word' },
  { id: 's-5', label: 'bicycle bell', category: 'word' },
  { id: 's-6', label: 'ocean salt', category: 'word' },
  { id: 's-7', label: 'cat silhouette', category: 'image', emoji: '🐈' },
  { id: 's-8', label: 'orange peel', category: 'word' },
  { id: 's-9', label: 'subway map', category: 'image', emoji: '🗺️' },
  { id: 's-10', label: 'paper crane', category: 'image', emoji: '🕊️' },
  { id: 's-11', label: 'echoing hallway', category: 'word' },
  { id: 's-12', label: 'glowing cursor', category: 'word' },
  { id: 's-13', label: 'chess knight', category: 'image', emoji: '♞' },
  { id: 's-14', label: 'pine scent', category: 'word' },
  { id: 's-15', label: 'handwritten note', category: 'word' },
  { id: 's-16', label: 'spinning coin', category: 'image', emoji: '🪙' },
  { id: 's-17', label: 'window reflection', category: 'word' },
  { id: 's-18', label: 'yellow scarf', category: 'word' },
  { id: 's-19', label: 'ceramic mug', category: 'word' },
  { id: 's-20', label: 'clock chime', category: 'word' },
  { id: 's-21', label: 'teal square', category: 'shape' },
  { id: 's-22', label: 'amber circle', category: 'shape' },
  { id: 's-23', label: 'mauve triangle', category: 'shape' },
  { id: 's-24', label: 'silver key', category: 'image', emoji: '🗝️' },
  { id: 's-25', label: 'train whistle', category: 'word' },
  { id: 's-26', label: 'violet notebook', category: 'word' },
  { id: 's-27', label: 'airplane trail', category: 'word' },
  { id: 's-28', label: 'distant thunder', category: 'word' },
  { id: 's-29', label: 'quiet applause', category: 'word' },
  { id: 's-30', label: 'honeycomb', category: 'image', emoji: '🍯' },
]

export const lureItems: string[] = ['glass marble', 'violet lantern', 'snow boots', 'silent metronome']

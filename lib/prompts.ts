// CSV Prompts Data - Extracted from ai_prompts.csv
export interface PromptData {
  category: string;
  prompt: string;
  promptTemplate: string;
  examplePrompt: string;
  simplePrompts: string[];
}

export const FLASHCARD_PROMPTS: PromptData[] = [
  {
    category: "FlashCards",
    prompt: "Six flashcards for toddlers, each with a single, simple, bold, colorful cartoon illustration of an object, centered, with its name in clear black sans-serif text below the illustration. The flashcards are arranged in a 2x3 grid on a white background. Examples of objects include a carrot, a leaf, a ladybug, a pig, the Earth, and a flower.",
    promptTemplate: "Six flashcards for toddlers, arranged in a 2x3 grid on a white background. Each flashcard features a single, simple, bold, colorful cartoon illustration of [OBJECT 1], [OBJECT 2], [OBJECT 3], [OBJECT 4], [OBJECT 5], and [OBJECT 6]. Below each illustration, the object's name is written in clear black sans-serif text. The style is child-friendly, with prominent outlines and flat colors, designed for young children aged 2-5.",
    examplePrompt: "Six flashcards for toddlers, arranged in a 2x3 grid on a white background. Each flashcard features a single, simple, bold, colorful cartoon illustration of a red apple, a blue ball, a yellow duck, a green tree, a purple grape, and an orange cat. Below each illustration, the object's name is written in clear black sans-serif text. The style is child-friendly, with prominent outlines and flat colors, designed for young children aged 2-5.",
    simplePrompts: [
      "Toddler flashcards, 6 images.",
      "Simple picture cards for kids.",
      "Flashcards for children with names.",
      "Learning cards for toddlers.",
      "Animal flashcards for kids.",
      "Fruit flashcards, simple style.",
      "Shapes flashcards for toddlers.",
      "Flashcards of common objects."
    ]
  },
  {
    category: "FlashCards",
    prompt: "Four flashcards for toddlers, each with a single, simple, bold, colorful cartoon illustration of an object or animal, centered, with its name in clear black sans-serif text below the illustration. The flashcards are arranged in a 2x2 grid on a white background. The illustrations include a sippy cup, a smiling cat, a colorful beach ball, and a friendly dog.",
    promptTemplate: "Four flashcards for toddlers, arranged in a 2x2 grid on a white background. Each flashcard features a single, simple, bold, colorful cartoon illustration of [OBJECT/ANIMAL 1], [OBJECT/ANIMAL 2], [OBJECT/ANIMAL 3], and [OBJECT/ANIMAL 4]. Below each illustration, the object's or animal's name is written in clear black sans-serif text. The style is child-friendly, with prominent outlines and bright colors, designed for young children aged 2-5.",
    examplePrompt: "Four flashcards for toddlers, arranged in a 2x2 grid on a white background. Each flashcard features a single, simple, bold, colorful cartoon illustration of a red apple, a yellow duck, a blue car, and a green tree. Below each illustration, the object's or animal's name is written in clear black sans-serif text. The style is child-friendly, with prominent outlines and bright colors, designed for young children aged 2-5.",
    simplePrompts: [
      "Toddler flashcards, 4 images.",
      "Simple picture cards, 2x2 layout.",
      "Flashcards with words for kids.",
      "Learning cards for young children.",
      "Baby animals flashcards, 2x2 grid.",
      "Everyday objects flashcards for kids.",
      "Toy flashcards, simple drawings.",
      "Flashcards: cup, cat, ball, dog."
    ]
  }
];

export const LETTER_PROMPTS: PromptData[] = [
  {
    category: "Letters",
    prompt: "A black and white toddler worksheet for the letter 'A'. The page is divided into four sections. The top left has a dotted uppercase 'A' for tracing. The top right has a dotted lowercase 'a' for tracing. The bottom left has a simple line drawing of an airplane to color. The bottom right has a 'find the letter A' activity with various uppercase and lowercase letters.",
    promptTemplate: "A black and white toddler worksheet for the letter [LETTER, e.g., 'B']. The page is divided into four sections. The top left has a dotted uppercase [LETTER] for tracing. The top right has a dotted lowercase [LETTER] for tracing. The bottom left has a simple line drawing of a [OBJECT STARTING WITH THE LETTER, e.g., 'ball'] to color. The bottom right has a 'find the letter [LETTER]' activity with various uppercase and lowercase letters. The page has headings for 'Name' and 'Date' at the top.",
    examplePrompt: "A black and white toddler worksheet for the letter 'B'. The page is divided into four sections. The top left has a dotted uppercase 'B' for tracing. The top right has a dotted lowercase 'b' for tracing. The bottom left has a simple line drawing of a balloon to color. The bottom right has a 'find the letter B' activity with various uppercase and lowercase letters. The page has headings for 'Name' and 'Date' at the top.",
    simplePrompts: [
      "Create a letter tracing worksheet for kids.",
      "Alphabet worksheet for toddlers.",
      "Letter learning activity page.",
      "Black and white printable for preschoolers.",
      "Worksheet for the letter 'C' with a car.",
      "Trace the letter 'D' and color a dog.",
      "Letter 'E' tracing page for kindergarten.",
      "A worksheet to learn the letter 'F'."
    ]
  },
  {
    category: "Letters",
    prompt: "A black and white alphabet tracing worksheet for the uppercase letter 'A'. At the top, a large outlined 'A' with tracing arrows is shown next to a simple line drawing of an ant with the word 'ant'. Below this, there are two practice rows for tracing 'A', each starting with a solid 'A' followed by dashed lines. The bottom section features multiple lines of dashed uppercase 'A's for tracing practice. The worksheet is clean and functional.",
    promptTemplate: "A black and white alphabet tracing worksheet for the uppercase letter [LETTER, e.g., 'B']. At the top, a large outlined [LETTER] with tracing arrows is shown next to a simple line drawing of a [OBJECT STARTING WITH LETTER, e.g., 'bird'] with the word '[OBJECT NAME]'. Below this, there are two practice rows for tracing [LETTER], each starting with a solid [LETTER] followed by dashed lines. The bottom section features multiple lines of dashed uppercase [LETTER]s for tracing practice. The worksheet is clean and functional, designed for children aged 2-5.",
    examplePrompt: "A black and white alphabet tracing worksheet for the uppercase letter 'B'. At the top, a large outlined 'B' with tracing arrows is shown next to a simple line drawing of a bear with the word 'bear'. Below this, there are two practice rows for tracing 'B', each starting with a solid 'B' followed by dashed lines. The bottom section features multiple lines of dashed uppercase 'B's for tracing practice. The worksheet is clean and functional, designed for children aged 2-5.",
    simplePrompts: [
      "Letter tracing worksheet for kids.",
      "Alphabet practice page, black and white.",
      "Handwriting worksheet for preschoolers.",
      "Trace the letter [LETTER] activity.",
      "Worksheet to trace letter 'C' with a cat.",
      "Letter 'D' tracing practice with a dog picture.",
      "Uppercase 'E' tracing sheet for toddlers.",
      "Printable for learning to write letter 'F'."
    ]
  }
];

// Get random prompts for each category
export function getRandomFlashcardPrompts(count: number = 4): string[] {
  const allPrompts = FLASHCARD_PROMPTS.flatMap(promptData => promptData.simplePrompts);
  return shuffleArray(allPrompts).slice(0, count);
}

export function getRandomLetterPrompts(count: number = 4): string[] {
  const allPrompts = LETTER_PROMPTS.flatMap(promptData => promptData.simplePrompts);
  return shuffleArray(allPrompts).slice(0, count);
}

// Get specific prompts based on type
export function getColoringPrompts(): string[] {
  return [
    "A kite flying in sky",
    "A girl playing football on ground", 
    "An elephant eating grasses",
    "Friends playing with balls",
    "A butterfly on a flower",
    "A cat playing with yarn",
    "A colorful rainbow in the sky",
    "A happy sun with sunglasses",
    "A big tree with apples",
    "A cute puppy playing",
    "A beautiful flower garden",
    "A friendly dinosaur"
  ];
}

export function getTracingPrompts(): string[] {
  return [
    "Trace Alphabet A",
    "Trace alphabet a in smaller letter",
    "Trace number 8",
    "Spelling of One",
    "Trace twenty four",
    "Trace alphabet z in cursive",
    "Trace Alphabet B",
    "Trace number 5",
    "Spelling of Two",
    "Trace alphabet c in lowercase",
    "Trace Alphabet D",
    "Trace number 10"
  ];
}

// Utility function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get enhanced prompts for AI generation
export function getEnhancedColoringPrompt(simplePrompt: string): string {
  return `Create a simple, child-friendly coloring page line drawing of: ${simplePrompt}. 
  The image should be:
  - Black and white line art only (no colors)
  - Simple, bold outlines suitable for children aged 2-8
  - Clean, minimal design with no shading
  - Large, easy-to-color shapes
  - No text or words in the image
  - Suitable for printing and coloring with crayons or markers
  - Cartoon-style, friendly appearance`;
}

export function getEnhancedTracingPrompt(simplePrompt: string): string {
  return `Create a tracing worksheet for: ${simplePrompt}. 
  The worksheet should include:
  - Large, dotted letters or numbers for tracing
  - Simple line drawings related to the content
  - Practice lines for handwriting
  - Child-friendly, educational design
  - Suitable for children aged 2-8
  - Black and white, printer-friendly format`;
}

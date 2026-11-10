import { scene } from "./more-life";
import type { Story } from "./stories";

export const moreLifeStoriesTwo: Story[] = [
  scene({
    id: "pharmacy",
    title: "Behind the counter",
    topic: "At the pharmacy",
    category: "Out",
    scene: "A small shop, a cough, and a pharmacist who needs three questions answered.",
    partner: "The pharmacist",
    text: `The pharmacy smells of mint and paper. A pharmacist in a white coat looks up.

"{{ph-do-you-have-something-for}} a cough? It keeps me up at night."

"Is it dry or wet?"

"Dry. And {{ph-i-have-a-sore-throat}} too."

"Any allergies?"

"{{ph-im-allergic-to}} penicillin."

"Then this one is safe. Take one pill after meals."

"{{ph-how-many-a-day}}?"

"Three a day. If it lasts more than a week, see a doctor."

"{{ph-thats-all-thank-you}}. How much is it?"`,
    beats: [
      {
        id: "ph-do-you-have-something-for",
        text: "do you have something for",
        meaning: "ask for a medicine for a problem",
        partner: "Good morning. How can I help?",
        cue: "Name the problem, not the medicine.",
        you: "Do you have something for a cough? It keeps me up at night.",
      },
      {
        id: "ph-i-have-a-sore-throat",
        text: "I have a sore throat",
        meaning: "your throat hurts",
        partner: "Is it dry or wet?",
        cue: "Add the other symptom you have.",
        you: "Dry. And I have a sore throat too.",
      },
      {
        id: "ph-im-allergic-to",
        text: "I'm allergic to",
        meaning: "your body reacts badly to something",
        partner: "Do you have any allergies?",
        cue: "Say it clearly. This one matters.",
        you: "I'm allergic to penicillin.",
      },
      {
        id: "ph-how-many-a-day",
        text: "how many a day",
        meaning: "ask how often to take a medicine",
        partner: "This one is safe. One pill after meals.",
        cue: "Ask the dose before you leave.",
        you: "How many a day?",
      },
      {
        id: "ph-thats-all-thank-you",
        text: "that's all",
        meaning: "you have nothing else to ask for",
        partner: "Three a day. Anything else?",
        cue: "Close politely and ask for the price.",
        you: "That's all, thank you. How much is it?",
      },
    ],
  }),
  scene({
    id: "bank",
    title: "Window three",
    topic: "At the bank",
    category: "Out",
    scene: "A form with small boxes and a ticket number that is not yours yet.",
    partner: "Bank teller",
    text: `Ticket 47 is blinking on the screen. Maya steps up to window three.

"{{bank-id-like-to-open}} an account."

"Do you have your ID?"

"Yes, here. {{bank-what-documents-do-i-need}} besides my passport?"

"Proof of address. A utility bill is fine."

"{{bank-i-dont-have-one-with-me}}. Can I bring it tomorrow?"

"Of course. Anything else today?"

"{{bank-id-like-to-transfer}} some money abroad. {{bank-is-there-a-fee}}?"

"Yes, fifteen dollars."`,
    beats: [
      {
        id: "bank-id-like-to-open",
        text: "I'd like to open",
        meaning: "a polite way to start a request",
        partner: "Next, please. How can I help?",
        cue: "State your request in one clear line.",
        you: "I'd like to open an account.",
      },
      {
        id: "bank-what-documents-do-i-need",
        text: "what documents do I need",
        meaning: "ask which papers you must bring",
        partner: "Do you have your ID?",
        cue: "Ask what else is required.",
        you: "Yes, here. What documents do I need besides my passport?",
      },
      {
        id: "bank-i-dont-have-one-with-me",
        text: "I don't have one with me",
        meaning: "you cannot show it right now",
        partner: "We also need proof of address.",
        cue: "Be honest and offer a solution.",
        you: "I don't have one with me. Can I bring it tomorrow?",
      },
      {
        id: "bank-id-like-to-transfer",
        text: "I'd like to transfer",
        meaning: "you want to send money to another account",
        partner: "Of course. Anything else today?",
        cue: "Make the second request clearly.",
        you: "I'd like to transfer some money abroad.",
      },
      {
        id: "bank-is-there-a-fee",
        text: "is there a fee",
        meaning: "ask whether you must pay extra",
        partner: "That can be done today.",
        cue: "Ask about cost before you agree.",
        you: "Is there a fee for that?",
      },
    ],
  }),
  scene({
    id: "haircut",
    title: "Just a trim",
    topic: "At the hairdresser",
    category: "Out",
    scene: "A mirror, a cape, and a stylist who needs exact words.",
    partner: "The stylist",
    text: `The chair turns toward the mirror. Maya looks at her hair as if for the first time.

"What are we doing today?"

"{{hair-just-a-trim}}, please. About two centimeters."

"Short on the sides?"

"{{hair-not-too-short}}. I'd like to keep the length."

The scissors click softly. After a few minutes the stylist asks, "How's that?"

"{{hair-a-little-more-off-the-top}}, if you can."

At the end, the mirror shows a neat, calm version of her.

"{{hair-i-love-it}}. Thank you."`,
    beats: [
      {
        id: "hair-just-a-trim",
        text: "just a trim",
        meaning: "only a small cut",
        partner: "What are we doing today?",
        cue: "Say clearly how much you want cut.",
        you: "Just a trim, please. About two centimeters.",
      },
      {
        id: "hair-not-too-short",
        text: "not too short",
        meaning: "keep it from becoming very short",
        partner: "Shorter on the sides?",
        cue: "Set a limit. Stylists need one.",
        you: "Not too short. I'd like to keep the length.",
      },
      {
        id: "hair-a-little-more-off-the-top",
        text: "a little more off the top",
        meaning: "cut a bit more from the upper part",
        partner: "How's that?",
        cue: "Ask for a small change, politely.",
        you: "A little more off the top, if you can.",
      },
      {
        id: "hair-i-love-it",
        text: "I love it",
        meaning: "you are very happy with the result",
        partner: "All done. What do you think?",
        cue: "Say it warmly. It makes the stylist's day.",
        you: "I love it. Thank you!",
      },
    ],
  }),
  scene({
    id: "taxi",
    title: "Back seat",
    topic: "Taking a taxi",
    category: "Travel",
    scene: "A short ride, a long street name, and a driver with a good sense of humor.",
    partner: "The driver",
    text: `The taxi door closes with a soft thud. The driver turns down the radio.

"Where to?"

"{{taxi-could-you-take-me-to}} the central station, please?"

"No problem."

Ten minutes later the traffic stops.

"{{taxi-how-long-will-it-take}}, do you think?" Maya asks.

"Maybe twenty minutes at this rate."

"{{taxi-is-there-a-faster-way}}?"

"I'll try the side streets."

At the station she pays. "{{taxi-keep-the-change-driver}}. Thanks!"`,
    beats: [
      {
        id: "taxi-could-you-take-me-to",
        text: "could you take me to",
        meaning: "a polite way to give the destination",
        partner: "Where to?",
        cue: "Give the place and say please.",
        you: "Could you take me to the central station, please?",
      },
      {
        id: "taxi-how-long-will-it-take",
        text: "how long will it take",
        meaning: "ask for the length of the trip",
        partner: "We're in a bit of traffic.",
        cue: "Ask the question you really want answered.",
        you: "How long will it take, do you think?",
      },
      {
        id: "taxi-is-there-a-faster-way",
        text: "is there a faster way",
        meaning: "ask for a quicker route",
        partner: "Maybe twenty minutes at this rate.",
        cue: "Ask lightly, as a suggestion.",
        you: "Is there a faster way?",
      },
      {
        id: "taxi-keep-the-change-driver",
        text: "keep the change",
        meaning: "you do not need the extra money back",
        partner: "That's twelve fifty.",
        cue: "Finish with a friendly tip.",
        you: "Keep the change. Thanks!",
      },
    ],
  }),
  scene({
    id: "noise",
    title: "Thin walls",
    topic: "A noisy neighbor",
    category: "Home",
    scene: "A party in 3B, and a very polite knock on the door.",
    partner: "Your neighbor",
    text: `The bass has been shaking Maya's shelf for an hour. She stands at the door of 3B and breathes.

"Hi. {{noise-sorry-to-bother-you}}."

"Oh, hi! What's up?"

"{{noise-i-was-wondering-if}} you could turn the music down a little. I have to work early tomorrow."

"Oh no, is it that loud? I'm so sorry!"

"{{noise-i-dont-mind-until-ten}}, but after that it's hard to sleep."

"Of course. We'll keep it down."

"{{noise-i-really-appreciate-it}}. Have a good evening."`,
    beats: [
      {
        id: "noise-sorry-to-bother-you",
        text: "sorry to bother you",
        meaning: "a polite way to begin a small complaint",
        partner: "Hello?",
        cue: "Begin gently, even if you are annoyed.",
        you: "Hi. Sorry to bother you.",
      },
      {
        id: "noise-i-was-wondering-if",
        text: "I was wondering if",
        meaning: "a soft, polite way to ask for something",
        partner: "Oh, hi! What's up?",
        cue: "Ask for a change in a soft way.",
        you: "I was wondering if you could turn the music down a little.",
      },
      {
        id: "noise-i-dont-mind-until-ten",
        text: "I don't mind until",
        meaning: "something is okay up to a certain time",
        partner: "Oh no, is it that loud? I'm so sorry!",
        cue: "Be fair. Give a clear limit.",
        you: "I don't mind until ten, but after that it's hard to sleep.",
      },
      {
        id: "noise-i-really-appreciate-it",
        text: "I really appreciate it",
        meaning: "a warm, sincere thank you",
        partner: "Of course. We'll keep it down.",
        cue: "End the talk kindly.",
        you: "I really appreciate it. Have a good evening.",
      },
    ],
  }),
];

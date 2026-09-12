# Privacy

This repository is public. It is also a learning app built by a parent for
one child, which means the obvious risk is not a leaked credential — it is
detail about a minor.

## What the app itself collects

Nothing. There is no server, no analytics, no network request of any kind
beyond a Google Fonts stylesheet. Everything a learner does — their name,
finished days, written work, difficulty ratings, streak — is stored in their
own browser under `localStorage` key `lq_v3`, on their own device, and never
leaves it. The parent view reads that same local data. Nobody else can see
it, including the author of this repository.

## What must never be committed here

The combination that matters is *identity plus institution plus profile*. Any
one alone is usually harmless; together they locate a specific child and
attach an educational or psychological record to them.

Do not commit:

- School name, address, district, or town
- A child's name, age, date of birth, year group, or teacher
- Photographs, written work, or progress exports
- Assessment results, reading levels, diagnoses, or support needs tied to a
  named or locatable person

`docs/who-this-is-for.md` deliberately keeps the *design constraints* — one
idea per page, consequence-free, middle-school band — because the project
cannot be maintained without them. It no longer carries the biography that
made those constraints traceable to an individual.

## History

Redacting a file does not remove it from git history. Anything committed to a
public repository should be assumed to have been readable by anyone, and
possibly cached elsewhere, from the moment it was pushed. Removing it
afterwards limits future exposure; it does not undo past exposure.

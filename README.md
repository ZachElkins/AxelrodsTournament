# Axelrod's Tournament

Create custom players to test out new strategies against classic Axelrod agents.

---

## Running Locally
**Web Server:** `npm run start`
**Backend:** `npm run api` (or `npm run api-dev`)

---

## TODO
- Game Settings
  - Rounds
  - Custom score matrix
  - Round visbility toggle
- Round visiblity
  - New param for round number and round length
    - value is `None` if rounds are not visible
  - If rounds are not visible, user cannot play against prefab players that utilize round numbers
- Save players
  - Local storage
  - Load from save
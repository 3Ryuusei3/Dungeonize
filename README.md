# APIs

- https://www.dnd5eapi.co/docs/#overview--introduction
- https://api.pathfinder2.fr/
- API Google
- Cloudinary

# ROUTES

| HTTP Method | URI path                                                                | Description                 | JSON | DONE |
| ----------- | ----------------------------------------------------------------------- | --------------------------- | ---- | ---- |
| GET         | `/`                                                                     | Index page                  |      |      |
| GET         | `/signup`                                                               | Signup page                 |      |      |
| POST        | `/signup`                                                               | Signup page                 |      |      |
| GET         | `/login`                                                                | Login page                  |      |      |
| POST        | `/logout`                                                               | Logout                      |      |      |
| ----------- | ----------------------------------------------------------------------- | --------------------------- | ---- | ---- |
| GET         | `/player`                                                               | Edit user settings          |      |      |
| GET         | `/player/profile/{player_id}`                                           | User profile                |      |      |
| GET         | `/player/profile/edit/{player_id}`                                      | Edit user settings          |      |      |
| POST        | `/player/profile/edit/{player_id}`                                      | Update user settings        |      |      |
| GET         | `/player/characters/{player_id}`                                        | View your characters        |      |      |
| GET         | `/player/characters/create/{player_id}`                                 | Create character            |      |      |
| POST        | `/player/characters/create/{player_id}`                                 | Post new character          |      |      |
| GET         | `/player/characters/details/{player_id}/{character_id}`                 | Character details           |      |      |
| GET         | `/player/characters/details/info/{player_id}/{character_id}`            | Character info              |      |      |
| GET         | `/player/characters/details/info/edit/{player_id}/{character_id}`       | Update character info       |      |      |
| POST        | `/player/characters/details/info/edit/{player_id}/{character_id}`       | Edit character info         |      |      |
| GET         | `/player/characters/details/background/{player_id}/{character_id}`      | Character background        |      |      |
| GET         | `/player/characters/details/background/edit/{player_id}/{character_id}` | Edit character background   |      |      |
| POST        | `/player/characters/details/background/edit/{player_id}/{character_id}` | Update character background |      |      |
| GET         | `/player/characters/details/traits/{player_id}/{character_id}`          | Character traits            |      |      |
| GET         | `/player/characters/details/traits/edit/{player_id}/{character_id}`     | Edit character traits       |      |      |
| POST        | `/player/characters/details/traits/edit/{player_id}/{character_id}`     | Update character traits     |      |      |
| GET         | `/player/characters/details/equipment/{player_id}/{character_id}`       | Character equipment         |      |      |
| GET         | `/player/characters/details/equipment/edit/{player_id}/{character_id}`  | Edit character equipment    |      |      |
| POST        | `/player/characters/details/equipment/edit/{player_id}/{character_id}`  | Update character equipment  |      |      |
| GET         | `/player/characters/edit/{player_id}/{character_id}`                    | Edit character              |      |      |
| POST        | `/player/characters/edit/{player_id}/{character_id}`                    | Update character            |      |      |
| POST        | `/player/characters/delete/{player_id}/{character_id}`                  | Delete character            |      |      |
| ----------- | ----------------------------------------------------------------------- | --------------------------- | ---- | ---- |
| GET         | `/event`                                                                | Event list page             |      |      |
| GET         | `/event/create`                                                         | Create event                |      |      |
| POST        | `/event/create`                                                         | Post event                  |      |      |
| GET         | `/event/details/{event_id}`                                             | Event details               |      |      |
| GET         | `/event/edit/{event_id}`                                                | Edit event                  |      |      |
| POST        | `/event/edit/{event_id}`                                                | Update event                |      |      |
| POST        | `/event/delete/{event_id}`                                              | Delete event                |      |      |
| ----------- | ----------------------------------------------------------------------- | --------------------------- | ---- | ---- |
| GET         | `/friends/{player_id}`                                                  | Player friends page         |      |      |
| GET         | `/player/profile/{player_id}`                                           | Friend profile              |      |      |
| GET         | `/friends/friend-requests/{player_id}`                                  | Friend requests page        |      |      |
| ----------- | ----------------------------------------------------------------------- | --------------------------- | ---- | ---- |
| GET         | `/dm-panel`                                                             | DM Panel                    |      |      |
| GET         | `/admin-panel`                                                          | Admin Panel                 |      |      |
| ----------- | ----------------------------------------------------------------------- | --------------------------- | ---- | ---- |
| GET         | `/api`                                                                  | API                         | ✅   |      |
| GET         | `/api/users`                                                            | List of all users           | ✅   |      |
| GET         | `/api/users/{player_id}`                                                | User details                | ✅   |      |
| GET         | `/api/events`                                                           | List of all events          | ✅   |      |
| GET         | `/api/events/{event_id}`                                                | Event details               | ✅   |      |
| ----------- | ----------------------------------------------------------------------- | --------------------------- | ---- | ---- |

## POSIBLES NOMBRES

- Dungeon Profiler
- Dungeon Crafter
- Dungeonize
- DungeoniZer
- Dungy
- Mazmorritas
- MazmorritAPP
-

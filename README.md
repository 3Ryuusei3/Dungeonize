# APIs

- https://www.dnd5eapi.co/docs/#overview--introduction
- https://api.pathfinder2.fr/
- API Google
- Cloudinary

# ROUTES

| HTTP Method | URI path                                                                | Description                 | JSON | DONE |
| ----------- | ----------------------------------------------------------------------- | --------------------------- | ---- | ---- |
| GET         | `/`                                                                     | Index page                  |      | ✅   |
| GET         | `/signup`                                                               | Signup page                 |      | ✅   |
| POST        | `/signup`                                                               | Signup page                 |      | ✅   |
| GET         | `/login`                                                                | Login page                  |      | ✅   |
| POST        | `/login`                                                                | Login page post             |      | ✅   |
| GET         | `/logout`                                                               | Logout                      |      | ✅   |
| ----------- | ----------------------------------------------------------------------- | --------------------------- | ---- | ---- |
| GET         | `/dashboard`                                                            | Dashboard                   |      | ✅   |
| ----------- | ----------------------------------------------------------------------- | --------------------------- | ---- | ---- |
| GET         | `/user`                                                                 | User profile                |      | ✅   |
| GET         | `/user/details/{user_id}`                                               | User details                |      | ✅   |
| GET         | `/user/details/edit/{user_id}`                                          | Edit user settings          |      | ✅   |
| POST        | `/user/details/edit/{user_id}`                                          | Update user settings        |      | ✅   |
| POST        | `/user/delete/{user_id}`                                                | Delete user for admin       |      | ✅   |
| POST        | `/user/delete/account/{user_id}`                                        | Delete user's account       |      | ✅   |
| ----------- | ----------------------------------------------------------------------- | --------------------------- | ---- | ---- |
| GET         | `/characters`                                                           | View your characters        |      | ✅   |
| GET         | `/characters/create`                                                    | Create character            |      | ✅   |
| POST        | `/characters/create`                                                    | Post new character          |      | ✅   |
| GET         | `/characters/edit/{character_id}`                                       | Edit character              |      | ✅   |
| POST        | `/characters/edit/{character_id}`                                       | Update character            |      | ✅   |
| POST        | `/characters/delete/{character_id}`                                     | Delete character            |      | ✅   |
| GET         | `/characters/details/{character_id}`                                    | Character details           |      |      |
| GET         | `/characters/details/info/{character_id}`                               | Character info              |      |      |
| GET         | `/characters/details/info/edit/{character_id}`                          | Update character info       |      |      |
| POST        | `/characters/details/info/edit/{character_id}`                          | Edit character info         |      |      |
| GET         | `/characters/details/background/{character_id}`                         | Character background        |      |      |
| GET         | `/characters/details/background/edit/{character_id}`                    | Edit character background   |      |      |
| POST        | `/characters/details/background/edit/{character_id}`                    | Update character background |      |      |
| GET         | `/characters/details/traits/{character_id}`                             | Character traits            |      |      |
| GET         | `/characters/details/traits/edit/{character_id}`                        | Edit character traits       |      |      |
| POST        | `/characters/details/traits/edit/{character_id}`                        | Update character traits     |      |      |
| GET         | `/characters/details/equipment/{character_id}`                          | Character equipment         |      |      |
| GET         | `/characters/details/equipment/edit/{character_id}`                     | Edit character equipment    |      |      |
| POST        | `/characters/details/equipment/edit/{character_id}`                     | Update character equipment  |      |      |
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
| GET         | `/user/details/{player_id}`                                             | Friend profile              |      |      |
| GET         | `/friends/friend-requests/{player_id}`                                  | Friend requests page        |      |      |
| ----------- | ----------------------------------------------------------------------- | --------------------------- | ---- | ---- |
| GET         | `/dm-panel`                                                             | DM Panel                    |      |      |
| GET         | `/admin-panel`                                                          | Admin Panel                 |      |      |
| ----------- | ----------------------------------------------------------------------- | --------------------------- | ---- | ---- |
| GET         | `/api`                                                                  | API                         | ✅   |      |
| GET         | `/api/users`                                                            | List of all users           | ✅   | ✅   |
| GET         | `/api/users/{player_id}`                                                | User details                | ✅   |      |
| GET         | `/api/events`                                                           | List of all events          | ✅   |      |
| GET         | `/api/events/{event_id}`                                                | Event details               | ✅   |      |
| ----------- | ----------------------------------------------------------------------- | --------------------------- | ---- | ---- |

import {
  getCurrentEventList,
  getWorldBoss,
} from '../../libs/worldState';

const api = {};

/**
 * @swagger
 * /api/v4/world-state:
 *   get:
 *     produces:
 *       - application/json
 *     description: Does not require authentication
 *     summary: Get the state for the game world
 *     operationId: WorldStateGet
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  npcImageSuffix:
 *                    type: string
 *                    description: Trailing component of NPC image filenames
 *                    example: _fall
 *                  currentEvent:
 *                    type: object
 *                    properties:
 *                      event:
 *                        type: string
 *                        description: Name of the event
 *                        example: fall
 *                      npcImageSuffix:
 *                        type: string
 *                        description: Trailing component of NPC image filenames for the event
 *                        example: _fall
 *                      season:
 *                        type: string
 *                        description: The season during the event
 *                        example: fall
 *                      gear:
 *                        type: boolean
 *                        description: #TODO
 *                      start:
 *                        type: string
 *                        description: Start of the event
 *                        example: 2024.09.21
 *                      end:
 *                        type: string
 *                        description: End of the event
 *                        example: 2024.12.21
 *                  worldBoss:
 *                    type: object
 *                    properties:
 *                      active:
 *                        type: boolean
 *                        description: True if world boss quest is underway
 *                      worldDmg:
 *                        type: object
 *                        description: Names of NPCs with boolean -> true if affected by Rage Strike.
 *                      key:
 *                        type: string
 *                        description: Quest content key for the world boss
 *                  currentEventList:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        event:
 *                          type: string
 *                          description: Name of the event
 *                          example: fall
 *                        npcImageSuffix:
 *                          type: string
 *                          description: Trailing component of NPC image filenames for the event
 *                          example: _fall
 *                        season:
 *                          type: string
 *                          description: The season during the event
 *                          example: fall
 *                        gear:
 *                          type: boolean
 *                          description: #TODO
 *                        start:
 *                          type: string
 *                          description: Start of the event
 *                          example: 2024.09.21
 *                        end:
 *                          type: string
 *                          description: End of the event
 *                          example: 2024.12.21
 *     tags:
 *       - WorldState
 */
api.getWorldState = {
  method: 'GET',
  url: '/world-state',
  async handler (req, res) {
    const worldState = { npcImageSuffix: '', currentEvent: null };

    worldState.worldBoss = await getWorldBoss();
    worldState.currentEventList = getCurrentEventList();
    if (worldState.currentEventList.length > 0) {
      [worldState.currentEvent] = worldState.currentEventList;
    }

    worldState.currentEventList.forEach(event => {
      if (event.npcImageSuffix && !worldState.npcImageSuffix) {
        worldState.npcImageSuffix = event.npcImageSuffix;
      }
    });

    res.respond(200, worldState);
  },
};

export default api;

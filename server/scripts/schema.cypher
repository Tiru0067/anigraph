// Constraints to ensure unique IDs across all node types
CREATE CONSTRAINT anime_id_unique IF NOT EXISTS FOR (a:Anime) REQUIRE a.id IS UNIQUE;
CREATE CONSTRAINT studio_id_unique IF NOT EXISTS FOR (s:Studio) REQUIRE s.id IS UNIQUE;
CREATE CONSTRAINT staff_id_unique IF NOT EXISTS FOR (st:Staff) REQUIRE st.id IS UNIQUE;
CREATE CONSTRAINT character_id_unique IF NOT EXISTS FOR (c:Character) REQUIRE c.id IS UNIQUE;
CREATE CONSTRAINT voiceactor_id_unique IF NOT EXISTS FOR (va:VoiceActor) REQUIRE va.id IS UNIQUE;
CREATE CONSTRAINT genre_name_unique IF NOT EXISTS FOR (g:Genre) REQUIRE g.name IS UNIQUE;
CREATE CONSTRAINT tag_name_unique IF NOT EXISTS FOR (t:Tag) REQUIRE t.name IS UNIQUE;

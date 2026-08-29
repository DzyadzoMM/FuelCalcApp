import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const refuels = sqliteTable("refuels", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  liters: real("liters").notNull(),
  price: real("price").notNull(),
  distance: real("distance").notNull(),      
  trip_distance: real("trip_distance"),       
  consumption: real("consumption"),           
  total_cost: real("total_cost").notNull(),
  date: text("date").notNull(),               
});

CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`description` text NOT NULL,
	`color` text
);
--> statement-breakpoint
CREATE TABLE `inventory_log` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`product` text NOT NULL,
	`type` text,
	`quantity` integer NOT NULL,
	`save_date` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `states` (
	`id` integer PRIMARY KEY NOT NULL,
	`description` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`order_date` integer DEFAULT (unixepoch()),
	`state` integer DEFAULT 1,
	`total` real DEFAULT 0 NOT NULL,
	`products` text NOT NULL,
	`urgent` integer DEFAULT false,
	`client` text NOT NULL,
	FOREIGN KEY (`state`) REFERENCES `states`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`price` real DEFAULT 0 NOT NULL,
	`unit_cost` real DEFAULT 0 NOT NULL,
	`stock` integer DEFAULT 0 NOT NULL,
	`stock_limit` integer DEFAULT 5 NOT NULL,
	`creation_date` integer DEFAULT (unixepoch()),
	`modify_date` integer DEFAULT (unixepoch()),
	`category` integer,
	FOREIGN KEY (`category`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `categories_description_unique` ON `categories` (`description`);--> statement-breakpoint
CREATE UNIQUE INDEX `states_description_unique` ON `states` (`description`);--> statement-breakpoint
CREATE UNIQUE INDEX `products_name_unique` ON `products` (`name`);
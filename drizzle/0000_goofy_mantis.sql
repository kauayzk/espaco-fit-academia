CREATE TABLE `leads` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`phone` text NOT NULL,
	`plan` text NOT NULL,
	`price` text NOT NULL,
	`objective` text NOT NULL,
	`preferred_period` text NOT NULL,
	`preferred_date` text NOT NULL,
	`experience` text NOT NULL,
	`notes` text DEFAULT '' NOT NULL,
	`source` text DEFAULT 'direto' NOT NULL,
	`utm_source` text DEFAULT '' NOT NULL,
	`utm_medium` text DEFAULT '' NOT NULL,
	`utm_campaign` text DEFAULT '' NOT NULL,
	`status` text DEFAULT 'novo' NOT NULL,
	`consent_at` text NOT NULL,
	`whatsapp_opened` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `leads_created_at_idx` ON `leads` (`created_at`);--> statement-breakpoint
CREATE INDEX `leads_status_idx` ON `leads` (`status`);--> statement-breakpoint
CREATE INDEX `leads_phone_idx` ON `leads` (`phone`);--> statement-breakpoint
CREATE TABLE `tracking_events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`event` text NOT NULL,
	`path` text DEFAULT '/' NOT NULL,
	`source` text DEFAULT 'direto' NOT NULL,
	`metadata` text DEFAULT '{}' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `tracking_event_idx` ON `tracking_events` (`event`);--> statement-breakpoint
CREATE INDEX `tracking_created_at_idx` ON `tracking_events` (`created_at`);
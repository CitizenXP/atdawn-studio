/*
	Control Room: deployment configuration
	======================================
	This is the ONLY file you need to edit when deploying, and the only file a
	spin-off has to change to look like its own product.

	brandName:
		The product name shown on every page. Change it and the whole UI follows.

	theme:
		Which themes/<name>.css to load on top of the neutral default built into
		studio.css. "" or "default" = the neutral slate-and-blue look.
		See studio/themes/README.md for how to make your own.

	adminPasswordHash:
		SHA-256 hex of the producer/admin password. Set your own before your first
		real event: admin.html -> Settings -> "Change admin password" generates the
		hash to paste below. Only the hash lives here, never the password.

	vdoPath:
		Path from the /studio/ folder to the VDO.Ninja install.
		"../" is correct when /studio/ lives inside the VDO.Ninja web root.
		You may also use an absolute URL (e.g. "https://vdo.yourdomain.com/").
*/
window.STUDIO_CONFIG = {
	brandName: "At Dawn Studio",
	tagline: "Remote Guest Green Room & Broadcast Control",

	// "" or "default" for the neutral look; otherwise loads themes/<theme>.css
	theme: "atdawn",

	vdoPath: "../",

	// SHA-256 of the admin password (set via admin.html -> Settings -> "Change admin password")
	adminPasswordHash: "2756913f66f6be6dc8152d971f1c9e7e7a99b9f77407c7f584b13c151993996d",

	// Defaults used the first time the dashboard runs (editable in Settings).
	// Leave the room fields empty: the dashboard then generates unguessable random
	// room names and a random password on first run. This matters because this file
	// is public if you host the repo publicly (which the AGPL license encourages).
	defaults: {
		eventName: "At Dawn Live",
		greenRoom: "",   // "" = auto-generate a random, unguessable room id
		mainRoom: "",    // "" = auto-generate
		roomPassword: "", // "" = auto-generate; shared by both rooms (needed for transfers)
		requirePasswordEntry: false // if true, guests must type the room password to join
	}
};

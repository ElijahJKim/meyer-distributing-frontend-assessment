export const RECENTLY_VIEWED_MAX_ITEMS = 5;

export interface RecentlyViewedItem {
	id: number;
	name: string;
	price: string;
	image_link: string;
	api_featured_image: string;
}

export interface INews {
        source: {
            id: string;
            name: string;
        };
        author: string;
        title: string;
        description: string;
        url: string;
        urlToImage: string;
        publishedAt: string;
        content: string;
        thread: {
            uuid: string;
            url: string;
            site_full: string;
            site: string;
            site_section: string;
            site_categories: string[];
            section_title: string;
            title_full: string;
            published: string;
            replies_count: number;
            participants_count: number;
            site_type: string;
            country: string;
            main_image: string;
            performance_score: number;
            domain_rank: number;
            domain_rank_updated: string;
            reach: number | null;
            social: {
                updated: string;
                facebook: {
                    likes: number;
                    comments: number;
                    shares: number;
                };
                gplus: {
                    shares: number;
                };
                pinterest: {
                    shares: number;
                };
                linkedin: {
                    shares: number;
                };
                stumbledupon: {
                    shares: number;
                };
                vk: {
                    shares: number;
                };
            };
        };
    }
    
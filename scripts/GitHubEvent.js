class GitHubEvent {
    constructor(event, index) {
        this.data = event;
        this.index = index;

        this.id = event.id;
        this.title = `${this.getName()}.`;
        this.repo = {
            name: event.repo.name,
            apiUrl: event.repo.url
        };
    }

    get timeFromNow() {
        const createdAt = this.data.created_at;
        return moment(createdAt).fromNow();
    }

    getName() {
        switch (this.data.type) {
            default: {
                return '';
            }
            case 'CommitCommentEvent': {
                return 'left a comment on a commit';
            }
            case 'CreateEvent': {
                return `created a ${this.data.payload.ref_type}`;
            }
            case 'DeleteEvent': {
                return `deleted a ${this.data.payload.ref_type}`;
            }
            case 'ForkEvent': {
                return 'forked a repository';
            }
            case 'GollumEvent': {
                return `${this.data.payload.pages[0].action} a wiki page`;
            }
            case 'IssueCommentEvent': {
                // 'edited' and 'deleted' are not public
                return 'commented on an issue';
            }
            case 'IssuesEvent': {
                return `${this.data.payload.action} an issue`;
            }
            // not tested below
            case 'LabelEvent': {
                return `${this.data.payload.action} an issue label`;
            }
            case 'MilestoneEvent': {
                return `${this.data.payload.action} a milestone`;
            }
            case 'PageBuildEvent': {
                return 'GitHub Pages built started...';
            }
            case 'ProjectCardEvent': {
                return `${this.data.payload.action} a project card`;
            }
            case 'ProjectColumnEvent': {
                return `${this.data.payload.action} a project column`;
            }
            case 'PullRequestEvent': {
                // TODO: there are some actions that do not work very well like that
                return `${this.data.payload.action} a pull request`;
            }
            case 'PullRequestReviewEvent': {
                return `${this.data.payload.action} a review on a pull request`;
            }
            case 'PullRequestReviewCommentEvent': {
                return `${
                    this.data.payload.action
                } a comment on a pull request`;
            }
            case 'PushEvent': {
                const commitCount = this.data.payload.commits.length;
                return `pushed ${commitCount} commit${
                    commitCount > 1 ? 's' : ''
                }`;
            }
            case 'RepositoryEvent': {
                return `${this.data.payload.action} a repository`;
            }
            case 'StarEvent': {
                const action =
                    this.data.payload.action === 'created'
                        ? 'starred'
                        : 'unstarred';
                return `${action} a repository`;
            }
            case 'WatchEvent': {
                return `${this.data.payload.action} watching a repository`;
            }
        }
    }

    async getRepoUrl() {
        const result = await fetch(this.repo.apiUrl);
        if (result) {
            const data = await result.json();
            this.repo = {
                ...this.repo,
                url: data.html_url
            };
            return data.html_url;
        }

        return '';
    }
}

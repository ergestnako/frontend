define([
    'bean',
    'qwery',
    'common/utils/$',
    'common/utils/template',
    'common/views/svg',
    'common/utils/fastdom-promise',
    'common/utils/mediator',
    'text!common/views/contributions-epic-equal-buttons.html',
    'common/utils/robust',
    'inlineSvg!svgs/icon/arrow-right',
    'common/utils/config',
    'common/utils/cookies',
    'common/utils/ajax',
    'common/modules/commercial/commercial-features',
    'common/utils/element-inview',
    'common/modules/experiments/ab',
    'lodash/arrays/intersection'
], function (bean,
             qwery,
             $,
             template,
             svg,
             fastdom,
             mediator,
             contributionsEpicEqualButtons,
             robust,
             arrowRight,
             config,
             cookies,
             ajax,
             commercialFeatures,
             ElementInview,
             ab,
             intersection) {

    return function () {
        this.id = 'ContributionsEpicUsEoyEndOfYear';
        this.start = '2016-12-13';
        this.expiry = '2016-12-31';
        this.author = 'Guy Dawson';
        this.description = 'Run the end of year variant for 12.5% of the US audience';
        this.showForSensitive = false;
        this.audience = 0.125;
        this.audienceOffset = 0.875;
        this.successMeasure = 'Conversion rate (contributions / impressions)';
        this.audienceCriteria = 'All';
        this.dataLinkNames = '';
        this.idealOutcome = 'A conversion rate of 0.1%';
        this.canRun = function () {
            var userHasNeverContributed = !cookies.get('gu.contributions.contrib-timestamp');

            // may render badly on other types
            var worksWellWithPageTemplate = (config.page.contentType === 'Article') && !config.page.isMinuteArticle;

            // prevent multiple epics from being shown
            var userInAlwaysAskStrategy = ab.isParticipating({id: 'ContributionsEpicAlwaysAskStrategy'});

            var isCharityAskPage = function() {
                var charityKeywordIds = [
                    // TODO
                ];
                var pageKeywordIdsString = config.page.keywordIds;
                if (typeof (pageKeywordIdsString) !== 'undefined') {
                    var pageKeywordIds = pageKeywordIdsString.split(',');
                    return intersection(charityKeywordIds, pageKeywordIds).length > 0;
                } else {
                    return false;
                }
            };

            return userHasNeverContributed &&
                commercialFeatures.canReasonablyAskForMoney &&
                worksWellWithPageTemplate &&
                !userInAlwaysAskStrategy &&
                !isCharityAskPage();
        };

        var makeEvent = (function(name) {
            return this.id + ':' + name;
        }).bind(this);

        function makeUrl(urlPrefix, intcmp) {
            return urlPrefix + 'INTCMP=' + intcmp;
        }

        var contributeUrlPrefix = 'co_global_epic_us_eoy_end_of_year';
        var membershipUrlPrefix = 'gdnwb_copts_mem_epic_us_eoy_end_of_year';

        var epicInsertedEvent = makeEvent('insert');
        var epicViewedEvent = makeEvent('view');

        var membershipUrl = 'https://membership.theguardian.com/supporter?';
        var contributeUrl = 'https://contribute.theguardian.com/?';

        var messages  = {
            endOfYear: {
                title: 'As 2016 comes to a close…',
                p1: '…we would like to ask for your support. More people are reading the Guardian than ever but far fewer are paying for it. And advertising revenues across the media are falling fast. So you can see why now is the right time to ask. The Guardian\'s independent, investigative journalism takes a lot of time, money and hard work to produce. But we do it because we believe our perspective matters – because it might well be your perspective, too.',
                p2: 'If everyone who reads our reporting – who believes in it – helps to support it, our future would be more secure.'
            }
        };

        var cta = {
            equal: {
                p3: '',
                cta1: 'Become a Supporter',
                cta2: 'Make a contribution',
                url1: makeUrl(membershipUrl, membershipUrlPrefix),
                url2:  makeUrl(contributeUrl, contributeUrlPrefix),
                hidden: ''
            }
        };

        var componentWriter = function (component) {
            ajax({
                url: 'https://api.nextgen.guardianapps.co.uk/geolocation',
                method: 'GET',
                contentType: 'application/json',
                crossOrigin: true
            }).then(function (resp) {
                if ('country' in resp && resp.country === 'US'){
                    fastdom.write(function () {
                        var submetaElement = $('.submeta');
                        if (submetaElement.length > 0) {
                            component.insertBefore(submetaElement);
                            mediator.emit(epicInsertedEvent, component);
                            $('.contributions__epic').each(function (element) {
                                // top offset of 18 ensures view only counts when half of element is on screen
                                var elementInView = ElementInview(element, window, {top: 18});
                                elementInView.on('firstview', function () {
                                    mediator.emit(epicViewedEvent);
                                });

                            });
                        }
                    });
                }
            });
        };

        function registerInsertionListener(track) {
            mediator.on(epicInsertedEvent, track);
        }

        function registerViewListener(complete) {
            mediator.on(epicViewedEvent, complete);
        }

        this.variants = [
            {
                id: 'endOfYear',

                test: function () {
                    var ctaType = cta.equal;
                    var message = messages.endOfYear;
                    var component = $.create(template(contributionsEpicEqualButtons, {
                        linkUrl1: ctaType.url1,
                        linkUrl2: ctaType.url2,
                        title: message.title,
                        p1: message.p1,
                        p2: message.p2,
                        p3: ctaType.p3,
                        cta1: ctaType.cta1,
                        cta2: ctaType.cta2,
                        hidden: ctaType.hidden
                    }));
                    componentWriter(component);
                },

                impression: registerInsertionListener,

                success: registerViewListener
            }
        ];
    };
});
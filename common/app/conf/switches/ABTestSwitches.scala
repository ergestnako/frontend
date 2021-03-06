package conf.switches

import common.editions._
import conf.switches.SwitchGroup.ABTests
import org.joda.time.LocalDate

trait ABTestSwitches {

  for ((edition, testId) <- Map(
    International -> "ab-membership-engagement-international-experiment-test12",
    Au -> "ab-au-memb-engagement-msg-copy-test8"
  )) Switch(
    SwitchGroup.ABTests,
    testId,
    s"Test effectiveness of engagement banners in the $edition edition for driving Membership & Contributions.",
    owners = Seq(Owner.withGithub("rtyley")),
    safeState = On,
    sellByDate = new LocalDate(2017, 9, 8), // we'll be doing AB tests on this for a long time, don't want to break the build
    exposeClientSide = true
  )

  Switch(
    ABTests,
    "ab-explainer-snippet",
    "Displays an explainer in the form of a disclosure widget",
    owners = Seq(Owner.withGithub("regiskuckaertz")),
    safeState = Off,
    sellByDate = new LocalDate(2017, 6, 6),
    exposeClientSide = true
  )

  Switch(
    ABTests,
    "ab-measure-understanding",
    "Asks users if they feel better informed after reading an article",
    owners = Seq(Owner.withGithub("regiskuckaertz")),
    safeState = Off,
    sellByDate = new LocalDate(2017, 6, 6),
    exposeClientSide = true
  )

  Switch(
    ABTests,
    "ab-opinion-email-variants",
    "Assign users to variants of opinion emails",
    owners = Seq(Owner.withGithub("davidfurey")),
    safeState = Off,
    sellByDate = new LocalDate(2017, 6, 1),
    exposeClientSide = true
  )

  Switch(
    ABTests,
    "ab-contributions-epic-always-ask-strategy",
    "Test to assess the effects of always asking readers to contribute via the Epic over a prolonged period",
    owners = Seq(Owner.withGithub("Mullefa")),
    safeState = Off,
    sellByDate = new LocalDate(2017, 6, 1),
    exposeClientSide = true
  )

  Switch(
    ABTests,
    "ab-contributions-epic-ask-four-earning",
    "This places the epic on all articles for all users, with a limit of 4 impressions in any given 30 days",
    owners = Seq(Owner.withGithub("jranks123")),
    safeState = Off,
    sellByDate = new LocalDate(2017, 6, 1),
    exposeClientSide = true
  )

  Switch(
    ABTests,
    "ab-acquisitions-epic-liveblog",
    "This places the epic below those blocks on liveblogs which have been marked for displaying the epic in Composer",
    owners = Seq(Owner.withGithub("joelochlann")),
    safeState = Off,
    sellByDate = new LocalDate(2017, 7, 3),
    exposeClientSide = true
  )

  Switch(
    ABTests,
    "ab-tailor-survey",
    "Integrate Tailor with ab tests",
    owners = Seq(Owner.withGithub("oilnam")),
    safeState = Off,
    sellByDate = new LocalDate(2017, 5, 31),
    exposeClientSide = true
  )

  Switch(
    ABTests,
    "ab-sleeve-notes-new-email-variant",
    "Assign some of the new sleeve notes subscribers to receive the new email",
    owners = Seq(Owner.withGithub("lmath")),
    safeState = Off,
    sellByDate = new LocalDate(2017, 6, 1),
    exposeClientSide = true
  )

  Switch(
    ABTests,
    "ab-sleeve-notes-legacy-email-variant",
    "Assign some of the new sleeve notes subscribers to receive the old email",
    owners = Seq(Owner.withGithub("lmath")),
    safeState = Off,
    sellByDate = new LocalDate(2017, 6, 1),
    exposeClientSide = true
  )

  Switch(
    ABTests,
    "ab-the-long-read-email-variants",
    "Assign users to variants of long read email",
    owners = Seq(Owner.withGithub("davidfurey")),
    safeState = Off,
    sellByDate = new LocalDate(2017, 6, 1),
    exposeClientSide = true
  )

  Switch(
    ABTests,
    "ab-fashion-statement-email-variants",
    "Assign users to variants of fashion statement email",
    owners = Seq(Owner.withGithub("davidfurey")),
    safeState = Off,
    sellByDate = new LocalDate(2017, 6, 1),
    exposeClientSide = true
  )

  Switch(
    ABTests,
    "ab-bookmarks-email-variants-2",
    "Assign users to variants of bookmarks email",
    owners = Seq(Owner.withGithub("davidfurey")),
    safeState = Off,
    sellByDate = new LocalDate(2017, 6, 1),
    exposeClientSide = true
  )

  Switch(
    ABTests,
    "ab-film-today-email-variants",
    "Assign users to variants of film today email",
    owners = Seq(Owner.withGithub("davidfurey")),
    safeState = Off,
    sellByDate = new LocalDate(2017, 6, 1),
    exposeClientSide = true
  )

  Switch(
    ABTests,
    "ab-paid-content-vs-outbrain-2",
    "Displays a paid content widget instead of Outbrain",
    owners = Seq(Owner.withName("commercial team")),
    safeState = Off,
    sellByDate = new LocalDate(2018, 1, 8),
    exposeClientSide = true
  )

  Switch(
    ABTests,
    "ab-bundle-digital-sub-price-test-1-m",
    "Test pricing options for digital subs",
    owners = Seq(Owner.withGithub("justinpinner")),
    safeState = Off,
    sellByDate = new LocalDate(2017, 6, 1),  // Thursday 1st June
    exposeClientSide = true
  )

  Switch(
    ABTests,
    "ab-acquisitions-epic-testimonials-round-two",
    "Test placing reader testimonials in the Epic",
    owners = Seq(Owner.withGithub("Mullefa")),
    safeState = On,
    sellByDate = new LocalDate(2017, 6, 13),
    exposeClientSide = true
  )

  Switch(
    ABTests,
    "ab-acquisitions-epic-pre-election",
    "Test 2 variants centered around the upcoming election",
    owners = Seq(Owner.withGithub("jranks123")),
    safeState = On,
    sellByDate = new LocalDate(2017, 6, 13),
    exposeClientSide = true
    )

  Switch(
    ABTests,
    "ab-acquisitions-epic-always-ask-if-tagged",
    "This guarantees that any on any article that is tagged with a tag that is on the allowed list of tags as set by the tagging tool, the epic will be displayed",
    owners = Seq(Owner.withGithub("jranks123")),
    safeState = On,
    sellByDate = new LocalDate(2018, 7, 19),
    exposeClientSide = true
  )

  Switch(
    ABTests,
    "ab-acquisitions-epic-testimonials-usa",
    "Test placing localised reader testimonials in the Epic",
    owners = Seq(Owner.withGithub("desbo")),
    safeState = On,
    sellByDate = new LocalDate(2017, 6, 26),
    exposeClientSide = true
  )
}

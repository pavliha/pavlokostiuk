You are running unattended, once a day, for Pavlo Kostiuk's job search. Nobody will read questions or answer them: never stop to ask, make each decision yourself and record it in the final summary.

Use the career-ops skill (`career-ops:career-ops`) in `pipeline` mode on `data/pipeline.md`, following its mode files, with these rules for this run:

1. Evaluate at most 15 pending postings. Pick them in this order: remote roles open worldwide, to EMEA/Europe or to contractors; then relocation roles in Germany, the Netherlands, Poland or the UAE; then the rest. Within a group, newest `posted:` first. Leave the others pending for tomorrow.
2. When the same role appears twice (for example an HN post and the company's own careers page), evaluate the employer's own URL and move the other to Processed as a duplicate.
3. Postings you cannot read (login wall, LinkedIn authwall, empty page) stay pending with their note; do not retry them more than once per run.
4. Everything else follows `modes/pipeline.md`: liveness sweep, pre-screen gate with the discard log, full evaluation, report, tailored CV PDF when the score reaches `auto_pdf_score_threshold`, tracker entry.
5. Never apply, never contact anyone, never send email.

Finish with a short summary: how many you evaluated, each score, which got a tailored CV, what you discarded and why, and how many remain pending.

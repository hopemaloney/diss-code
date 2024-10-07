import { Octokit } from "octokit";
// import { pullNumber } from "./isolatePRFileData";

export async function fetchPrs() {
  if (process.env.GITHUB_API_TOKEN === undefined) {
    throw new Error("MISSING Github api TOKEN");
  }
  const octokit = new Octokit({ auth: process.env.GITHUB_API_TOKEN });

  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();
  try {
    const iterator = octokit.paginate.iterator(
      "GET /repos/{owner}/{repo}/pulls",
      {
        owner: "Flutter-Global",
        repo: "tbd",
        per_page: 100,
      }
    );
    const allPrs = [];
    for await (const { data: prs } of iterator) {
      allPrs.push(...prs);
    }
    // console.log(`pullnumber`, allPrs[0].number)
    return allPrs;
  } catch (error) {
    console.error("Error fetching github repo", error);
    return [];
  }
}

export async function fetchPRFileInfo() {
  if (process.env.GITHUB_API_TOKEN === undefined) {
    throw new Error("MISSING Github api TOKEN");
  }
  const octokit = new Octokit({ auth: process.env.GITHUB_API_TOKEN });

  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();
  try {
    const fileIterator = octokit.paginate.iterator(
      "GET /repos/{owner}/{repo}/pulls/{pull_number}/files",
      {
        owner: "Flutter-Global",
        repo: "tbd",
        pull_number: 2853,
        per_page: 100,
      }
    );
    const prFiles = [];
    for await (const { data: file } of fileIterator) {
      prFiles.push(...file);
    }
    let filesChanged = prFiles.length;
    let changesInFile = 0;
      prFiles.forEach((file) => {
        changesInFile += file.changes;
      });
    console.log('total files changed', filesChanged);
    console.log('total changes in file', changesInFile)
  } catch (error) {
    console.error("Error fetching github repo", error);
    return [];
  }
}

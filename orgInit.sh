sfdx shane:org:create -f config/project-scratch-def.json -d 7 -s -n --userprefix admin --userdomain electron.demo

sfdx force:source:push
sfdx force:user:permset:assign -n electron

sfdx force:org:open
sfdx shane:user:password:set -g User -l User -p sfdx1234
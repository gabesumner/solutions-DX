# Create a manifest directory
mkdir manifest

# Fetch our package manifest from our repo
curl https://raw.githubusercontent.com/gabesumner/electron-motors-sfdx/master/manifest/package.xml --output ./manifest/package.xml

# Retrieve the source from our primary org
sfdx force:source:retrieve -x ./manifest/package.xml -u electron-motors

# Push what we retrieved to our scratch org.
sfdx force:source:push

# Assign a permset to our user
sfdx force:user:permset:assign -n electron

# Activate our custom theme
sfdx shane:theme:activate -n Electron

# Generate sample data
mkdir scripts
curl https://raw.githubusercontent.com/gabesumner/https://github.com/gabesumner/solutions-DX/master/scripts/generateSampleData.apex --output ./scripts/generateSampleData.apex
sfdx force:apex:execute -f scripts/generateSampleData.apex
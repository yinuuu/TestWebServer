#!/bin/bash

rm -f ../proxy/*.js
for ksf in `ls *.ksf`
do
    echo $ksf
    file_name=`basename $ksf .ksf`
    echo $file_name
    ksf2node --client $ksf
    ksf2node --server $ksf
    mv ${file_name}.js ${file_name}Ksf.js
    rm ${file_name}Imp.js
    mv ${file_name}*.js ../proxy/
done
